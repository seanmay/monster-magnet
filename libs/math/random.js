export const randomNumber = (min = 0, max = 1) =>
  Math.random() * (max - min) + min;

export const randomInt = (min = 0, max = 2) =>
  randomNumber(min, max) | 0;