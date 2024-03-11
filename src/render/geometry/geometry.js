import { Vector2 } from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry {
  /**
   * @type {Record<string,any[]>}
  */
  attributes = {}
  /**
   * @package
   * @type {Path2D}
   */
  drawable
  /**
   * @param { Vector2[]} vertices
   */
  constructor(positions) {
    this.drawable = new Path2D()
    BufferGeometry.setAttribute(this,"position",positions)
    this.updateVertices(positions)
  }
  /**
   * @param {Vector2[]} data
  */
  updateVertices(data){
    vertices(this.drawable, data, true)
  }
  static setAttribute(geometry,name,attribute){
    geometry.attributes[name] = attribute
  }
}