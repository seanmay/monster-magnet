export default (ctx, {x:x1, y:y1}, {x:x2, y:y2}, style = {color: "white"}) => {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
};