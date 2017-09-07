import Vector from "./vector.js";

export const Point = (x, y) => ({ x, y });
Point.toVector = ({ x, y }) => Vector(x, y);