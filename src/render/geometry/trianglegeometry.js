import { BufferGeometry } from "./geometry.js"
import { Vector2 } from "../../math/index.js"

export class TriangleGeometry extends BufferGeometry {
  /**
   * @param {number} base
   * @param {number} height
   * @param {number} angle
   */
  constructor(base, height, angle = Math.asin(height / base)) {
    const l1 = new Vector2(1).multiply(base)
    const l2 = Vector2.fromAngle(angle).multiply(-height / Math.sin(angle))
    const center = new Vector2((
        l1.x + l2.x) / 3,
      l2.y / 3
    )
    super()
    BufferGeometry.setAttribute(this, "position", [
            l2.sub(center),
            l1.sub(center),
            center.reverse()
    ])
    BufferGeometry.initCanvas2D(this)
  }
}