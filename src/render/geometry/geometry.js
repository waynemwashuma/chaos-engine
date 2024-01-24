import { Vector2 } from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry {
  /**
   * @package
   * @type Path2D | WebGLVertexArrayObject
   */
  drawable = null
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.updateVertices(vertices)
  }
  /**
   * @param {Vector2[]} data
  */
  updateVertices(data){
    const path = this.drawable = new Path2D()
    vertices(path, data, true)
  }
}