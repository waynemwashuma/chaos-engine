import { Position3D, Orientation3D, Scale3D } from "../components/index.js"

export function createTransform2D(
  x = 0,
  y = 0,
  z = 0,
  ox = 0,
  oy = 0,
  oz = 0,
  sx = 1,
  sy = 1,
  sz = 1
) {
  return [
    new Position3D(x, y, z),
    new Orientation3D().fromEuler(),
    new Scale3D(sx, sy, sz)
    ]
}