const defaultStyle = { bg: "rgba(0, 0, 200, 0.2)", border: "white" };

export default (x, y, radius, style = defaultStyle) =>
  ({ x, y, radius, style, type: "circle" });