const defaultScale = 1;

export default (image, rect, scale = defaultScale) =>
  ({ image, rect, scale, type: "sprite" });