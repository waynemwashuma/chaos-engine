import { circle } from "../utils/canvasfunc.js"


export class CircleGeometry {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    this.init(radius)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  init(radius) {
    this.drawable = new Path2D()
    circle(this.drawable,0,0,radius)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    circle(ctx, 0, 0, this.radius)
  }
}