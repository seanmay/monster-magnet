import { compose, zip, appendEntry   } from "../libs/fp/core.js";
import { randomInt } from "../libs/math/random.js";
import loadImage from "../libs/graphics/load-image.js";
import Monster from "./monster.js";



const buildAssetUrl = type => `../assets/${type}.png`;

export const loadAssets = (assetList) =>
  Promise.all(
    assetList
      .map(compose(loadImage, buildAssetUrl)))
    .then(images => zip(assetList, images)
      .reduce(appendEntry, {}));

export const render = (ctx, assets, entities) => {
  clearScreen(ctx);
  const strategies = {
    sprite: renderSprite,
    circle: renderCircle,
    line: renderLine,
  };
  entities.forEach(() => {});
};

export const generateMonsters = (count, { left, top, right, bottom }) => {
  return Array.from({ length: count })
    .map(() => Monster(randomInt(left, right), randomInt(top, bottom)));
};

export const generateVictims = (count, { left, top, right, bottom }) => {
  return Array.from({ length: count })
    .map(() => ({
      x: randomInt(left, right),
      y: randomInt(top, bottom),
      type: "victim",
    }));
};