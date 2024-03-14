import { Vector2 } from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry {
  /**
   * @package
   * @type {Path2D}
   */
  drawable
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.drawable = new Path2D()
    this.updateVertices(vertices)
  }
  /**
   * @param {Vector2[]} data
  */
  updateVertices(data){
    vertices(this.drawable, data, true)
  }
}