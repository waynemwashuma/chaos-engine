import { BufferGeometry } from "./geometry.js"
import { Vector2 } from "../../math/index.js"

export class TriangleGeometry extends BufferGeometry {
  /**
   * @param {number} base
   * @param {number} height
   * @param {number} angle
   */
  constructor(base, height, angle = Math.asin(height / base)) {
    const l1 = new Vector2(base)
    const l2 = Vector2.fromAngle(angle)
    Vector2.multiplyScalar(l2, -height / Math.sin(angle), l2)
    const center = new Vector2(
      -(l1.x + l2.x) / 3,
      -l2.y / 3
    )
    super()
    BufferGeometry.setAttribute(this, "position", [
      center,
      Vector2.add(l1,center,l1),
      Vector2.add(l2,center,l2),
    ])
    BufferGeometry.initCanvas2D(this)
  }
}