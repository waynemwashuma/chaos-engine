import { circle } from "../utils/canvasfunc.js"


export class CircleGeometry {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    this.radius = radius
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    circle(ctx, 0, 0, this.radius)
  }
}