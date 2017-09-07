import Point from "./point.js";

export const Vector = (x, y) => [x, y];
Vector.toPoint = ([x, y]) => Point(x, y);