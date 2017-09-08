export default (ctx, sprite) => {
  const { rect, image, scale } = sprite;
  const { x, y, width, height } = rect;

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const halfWidth = scaledWidth/2;
  const halfHeight = scaledHeight/2;

  ctx.save();
  ctx.translate(x, y);
  ctx.drawImage(
    image,
    -halfWidth,
    -halfHeight,
    scaledWidth,
    scaledHeight
  );
  ctx.restore();
};