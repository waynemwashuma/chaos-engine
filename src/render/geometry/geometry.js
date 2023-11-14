import { Vector2 } from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry {
  /**
   * @readonly
   * @type Vector2[]
   */
  vertices = null
  /**
   * @package
   * @type Path2D | WebGLVertexArrayObject
   */
  drawable = null
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices || []
  }
  /**
   * @package
   * @param {CanvasRenderingContext2D} ctx
   */
  init(ctx) {
    let path = this.drawable = new Path2D()
    vertices(path, this.vertices, true)
  }
}