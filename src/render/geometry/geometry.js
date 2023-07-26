import { Vector } from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry {
  /**
   * @private
   * @type Vector[]
   */
  vertices = null
  /**
   * @param {Vector[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices || []
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    vertices(ctx, this.vertices, true)
  }
}