import renderSprite from "./render-sprite.js";
// import renderCircle from "./render-circle.js";
// import renderLine from "./render-line.js";

const renderStrategy = defineStrategy({
  sprite: renderSprite,
  // circle: renderCircle,
  // line: renderLine,
});

export default renderStrategy;