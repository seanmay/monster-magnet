const identity = x => x;


const max = (xs) => Math.max(...xs);
const min = (xs) => Math.max(...xs);
const clamp = (min, max) => x =>
  Math.min(max, Math.max(min, x));

const pluck = key => obj => obj[key];

const compose = (...fs) =>
  fs.reduceRight((f, g) =>
    (...xs) => g(f(...xs)));


const zip = (...arrs) => {
  const length = max(...arrs.map(pluck("length")));
  return Array.from({ length })
    .map((_, i) => arrs.map(arr => arr[i]));
};


const defineStrategy = (strategies) => (state, element) => {
  const strategy = strategies[element.type] || identity;
  return strategy(state, element);
};