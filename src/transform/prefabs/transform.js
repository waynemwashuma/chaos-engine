import { Position2D, Orientation2D, Scale2D } from "../components/index.js"

export function createTransform(
  dx = 0,
  dy = 0,
  a = 0,
  sx = 1,
  sy = 1
) {
  return [
    new Position2D(dx, dy),
    new Orientation2D(a),
    new Scale2D(sx, sy)
    ]
}