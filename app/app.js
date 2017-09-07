import * as MonsterTypes from "./monster-types.js";
import Monster from "./monster.js";
import loadImage from "../libs/graphics/load-image.js";
import { compose, zip } from "../libs/fp/core.js";

import { render, loadAssets } from "./engine.js";

const monsterList = ["werewolf", "vampire", "zombie"];
const genderList = ["male", "female"];

const assetList = monsterList
  .map(monster => genderList
    .map(gender => `${gender}-${monster}`))
  .reduce((a, b) => a.concat(b), [`victim`]);

