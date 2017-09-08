import { randomInt, randomEntry } from "../libs/math/random.js";
import * as MonsterTypes from "./monster-types.js";


const randomizeGender = () =>
  ["female", "male"][randomInt(0, 2)];

const randomizeType = () =>
  randomEntry(MonsterTypes);

export default (x, y, type = randomizeType(), gender = randomizeGender()) =>
  ({ type, x, y, gender });