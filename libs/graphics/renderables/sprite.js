const defaultScale = 1;

export default Sprite = (image, rect, scale = defaultScale) =>
  ({ image, rect, scale, type: "sprite" });