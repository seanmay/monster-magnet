export const identity = x => x;


export const max = xs => Math.max(...xs);
export const min = xs => Math.min(...xs);
export const clamp = (min, max) => x => Math.min(max, Math.max(min, x));

export const pluck = key => obj => obj[key];

export const compose = (...fs) =>
  fs.reduceRight((f, g) => (...xs) => g(f(...xs)));


export const zip = (...arrs) => {
  const length = max(arrs.map(pluck("length")));
  return Array.from({ length }).map((_, i) => arrs.map(pluck(i)));
};

export const appendEntry = (obj, [key, value]) =>
  Object.assign({}, obj, {[key]: value});

export const defineStrategy = strategies => (state, element) => {
  const strategy = strategies[element.type] || identity;
  return strategy(state, element);
};