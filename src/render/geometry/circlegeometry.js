import { circle } from "../utils/canvasfunc.js"
import { BufferGeometry } from "./geometry.js"

export class CircleGeometry extends BufferGeometry {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    super()
    BufferGeometry.setAttribute(this, "position", [radius])
    CircleGeometry.initCanvas2D(this)
  }
  /**
   * @param {number} radius
   */
  static initCanvas2D(geometry) {
    geometry.drawable = new Path2D()
    circle(geometry.drawable, 0, 0, geometry.attributes["position"][0])
  }
}