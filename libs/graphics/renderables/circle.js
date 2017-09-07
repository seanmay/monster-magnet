const defaultStyle = { bg: "rgba(0, 0, 200, 0.4)" };

export default Circle = (position, radius, style = defaultStyle) =>
  ({ position, radius, style, type: "circle" });