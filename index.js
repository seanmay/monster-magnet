import * as App from "./app/app.js";
import Sprite from "./libs/graphics/renderables/sprite.js";
import Rect from "./libs/graphics/renderables/rect.js";
import Circle from "./libs/graphics/renderables/circle.js";
import renderSprite from "./libs/graphics/render/render-sprite.js";
import renderCircle from "./libs/graphics/render/render-circle.js";
import renderLine from "./libs/graphics/render/render-line.js";
import renderRect from "./libs/graphics/render/render-rect.js";
import { generateMonsters, generateVictims } from "./app/engine.js";

App.load().then(initializeView);

function initializeView(assets) {
  const main = document.querySelector("main");
  const canvas = document.querySelector(".Canvas");

  let monsters = [];
  let victims = [];
  let neighbours = [];

  const monsterCount = 20;
  const k = 5;

  const bounds = {
    left: 50,
    top: 50,
    right: canvas.width - 50,
    bottom: canvas.height - 50
  };

  const context = canvas.getContext("2d");
  const monsterButton = document.querySelector(".MonsterButton");
  const victimButton = document.querySelector(".VictimButton");
  const predictButton = document.querySelector(".PredictButton");
  const magicButton = document.querySelector(".CurtainButton");
  const predictionText = document.querySelector(".Prediction-value");
  const turfButton = document.querySelector(".TerrainButton");
  const turfWidth = document.querySelector(".TerrainBlockWidth"); 

  const clear = ctx => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    return ctx;
  };

  const calculateMagnitude = (p1, p2) => {
    const x = p1.x - p2.x;
    const y = p1.y - p2.y;
    const m = Math.sqrt(x ** 2 + y ** 2);
    return m;
  };

  const generateMonsterSprite = assets => ({ x, y, gender, type } = {}) => {
    const img = assets[`${gender}-${type}`];
    return Sprite(img, Rect(x, y, 80, 80));
  };

  const generateVictimSprite = assets => ({ x, y }) =>
    Sprite(assets.victim, Rect(x, y, 100, 100));

  const renderEntities = (ctx, entities) => {};

  monsterButton.onclick = () => {
    monsters = generateMonsters(monsterCount, bounds);
    victims = [];
    neighbours = [];
    predictionText.value = "???";

    const sprites = monsters.map(generateMonsterSprite(assets));

    clear(context);
    sprites.forEach(sprite => renderSprite(context, sprite));
  };

  victimButton.onclick = () => {
    victims = generateVictims(1, bounds);
    neighbours = [];
    predictionText.value = "???";

    const sprites = [
      ...monsters.map(generateMonsterSprite(assets)),
      ...victims.map(generateVictimSprite(assets))
    ];

    clear(context);
    sprites.forEach(sprite => renderSprite(context, sprite));
  };

  predictButton.onclick = () => {
    neighbours = victims
      .map(victim =>
        monsters
          .map(monster => ({
            distance: calculateMagnitude(victim, monster),
            monster
          }))
          .sort(
            (a, b) =>
              a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
          )
          .slice(0, k)
      )
      .reduce((a, b) => a.concat(b), []);

    const frequency = (counter, key) => {
      const count = counter[key] || 0;
      return Object.assign({}, counter, { [key]: count + 1 });
    };

    const counts = neighbours
      .map(({ monster }) => monster.type)
      .reduce(frequency, {});
    const [type] = Object.keys(counts)
      .map(key => [key, counts[key]])
      .reduce(
        (max, el) => {
          const [, maxCount] = max;
          const [, count] = el;
          return count > maxCount ? el : max;
        },
        ["no enemies", -Infinity]
      );

    predictionText.value = type;
  };

  magicButton.onclick = () => {
    const victim = victims[0];
    const farthest = neighbours[neighbours.length - 1];
    const magnitude = calculateMagnitude(victim, farthest.monster);

    clear(context);
    const circle = Circle(victim.x, victim.y, magnitude);
    const sprites = [
      ...monsters.map(generateMonsterSprite(assets)),
      ...victims.map(generateVictimSprite(assets))
    ];
    console.log(circle);
    console.log(victim);
    console.log(farthest);
    renderCircle(context, circle);
    neighbours
      .map(({ monster }) => monster)
      .forEach(monster => renderLine(context, victim, monster));
    sprites.forEach(sprite => renderSprite(context, sprite));
  };

  turfButton.onclick = () => {
    const colours = {
      vampire: "rgba(150, 0, 0, 0.3)",
      zombie: "rgba(0, 150, 0, 0.3)",
      werewolf: "rgba(150, 150, 150, 0.3)",
    };
    const totalWidth = 800;
    const totalHeight = 400;
    const square = +turfWidth.value;

    clear(context);
    for (let i = 0; i < totalWidth; i += square) {
      for (let j = 0; j < totalHeight; j += square) {
        const point = { x: i + square/2, y: j + square/2 };
        const neighbours = monsters
          .map(monster => ({
            distance: calculateMagnitude(point, monster),
            monster
          }))
          .sort((a, b) => (a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0))
          .slice(0, k);

        const frequency = (counter, key) => {
          const count = counter[key] || 0;
          return Object.assign({}, counter, { [key]: count + 1 });
        };

        const counts = neighbours
          .map(({ monster }) => monster.type)
          .reduce(frequency, {});
        const [type] = Object.keys(counts)
          .map(key => [key, counts[key]])
          .reduce(
            (max, el) => {
              const [, maxCount] = max;
              const [, count] = el;
              return count > maxCount ? el : max;
            },
            ["no enemies", -Infinity]
          );

        const rect = Rect(point.x, point.y, square, square, {
          bg: colours[type]
        });
        renderRect(context, rect);
      }
    }
    const sprites = monsters.map(generateMonsterSprite(assets));
    sprites.forEach(sprite => renderSprite(context, sprite));
  };
}
