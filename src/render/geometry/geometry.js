import { Vector } from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry {
  /**
   * @readonly
   * @type Vector[]
   */
  vertices = null
  /**
   * @package
   * @type Path2D | WebGLVertexArrayObject
  */
  _drawable = null
  /**
   * @param {Vector[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices || []
  }
    /**
   * @param {CanvasRenderingContext2D} ctx
   */
  init(ctx){
    this._drawable = new Path2D()
    vertices(path,this.vertices,true)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    vertices(ctx, this.vertices, true)
  }
}
