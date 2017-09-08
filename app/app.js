import * as MonsterTypes from "./monster-types.js";
import Monster from "./monster.js";


import { render, loadAssets } from "./engine.js";



export const load = () => {
  const monsterList = ["werewolf", "vampire", "zombie"];
  const genderList = ["male", "female"];

  const assetList = monsterList
    .map(monster => genderList.map(gender => `${gender}-${monster}`))
    .reduce((a, b) => a.concat(b), [`victim`]);

  return loadAssets(assetList);  
};

export const renderMonsters = (ctx, monsters) => {
  monsters.forEach(monster => render(ctx, monster));
  return ctx;
};

