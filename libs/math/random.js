export const randomNumber = (min = 0, max = 1) =>
  Math.random() * (max - min) + min;

export const randomInt = (min = 0, max = 2) =>
  randomNumber(min, max) | 0;

export const randomEntry = (dict) => {
  const keys = Object.keys(dict);
  const key = keys[randomInt(0, keys.length)];
  return dict[key];
};