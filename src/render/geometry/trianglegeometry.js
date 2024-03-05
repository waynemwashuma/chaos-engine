import {BufferGeometry} from "./geometry.js"
import {Vector2} from "../../math/index.js"

const tmp1 = new Vector2()
export class TriangleGeometry extends BufferGeometry{
  constructor(base, height, angle = Math.asin(height/base) ) {
    let l1 = new Vector2(1).multiply(base)
    let l2 = Vector2.fromAngle(angle).multiply(-height/Math.sin(angle))
    let center = tmp1.set((l1.x + l2.x) / 3, l2.y / 3)
    super([
      new Vector2().sub(center),
      l1.sub(center),
      l2.sub(center)
    ])
  }
}