export default (ctx, sprite) => {
  const {
    rect: { x, y, width, height },
    image,
    scale,
  };

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const halfWidth = scaledWith/2;
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