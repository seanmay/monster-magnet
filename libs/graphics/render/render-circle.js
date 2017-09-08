export default (ctx, circle) => {
  const { style, x, y, radius } = circle;

  ctx.save();
  ctx.fillStyle = style.bg || ctx.fillStyle;
  ctx.strokeStyle = style.border || ctx.strokeStyle;

  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  if (style.bg) ctx.fill();
  if (style.border) ctx.stroke();

  ctx.restore();
};