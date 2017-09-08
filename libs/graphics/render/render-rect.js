export default (ctx, { x, y, width, height, style }) => {
  const halfWidth = width/2;
  const halfHeight = height/2;

  ctx.save();
  ctx.fillStyle = style.bg || ctx.fillStyle;
  ctx.translate(x, y);
  ctx.fillRect(-halfWidth, -halfHeight, width, height);
  ctx.restore();
};