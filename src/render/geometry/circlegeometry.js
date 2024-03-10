import { circle } from "../utils/canvasfunc.js"


export class CircleGeometry {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    this.init(radius)
  }
  /**
   * @param {number} radius
   */
  init(radius) {
    this.drawable = new Path2D()
    circle(this.drawable,0,0,radius)
  }
}