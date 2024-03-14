import { BufferGeometry } from "./geometry.js"
import { Vector2 } from "../../math/index.js"

export class LineGeometry extends BufferGeometry {
  /**
   * @param {number} length
   */
  constructor(length) {
    const start = new Vector2(length / 2)
    const end = new Vector2(-length / 2)
    super()
    BufferGeometry.setAttribute(this, "position", [start, end])
    BufferGeometry.initCanvas2D(this)
  }
}