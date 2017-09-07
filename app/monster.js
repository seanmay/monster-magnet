import { randomInt } from "../libs/math/random.js";

const randomizeGender = () =>
  ["female", "male"][randomInt(0, 2)];

export const Monster = (type, position, gender = randomizeGender()) =>
  ({ type, position });