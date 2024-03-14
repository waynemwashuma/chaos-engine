import { Vector2 } from "../../math/index.js"
import { vertices } from "../utils/index.js"
import { warnOnce } from "../../logger/index.js"


export class BufferGeometry {
  /**
   * @type {Record<string,any[] | undefined>}
   */
  attributes = {}
  /**
   * @package
   * @type {Path2D | null}
   */
  drawable
  /**
   * @param { Vector2[]} vertices
   */
  /**
   * @param {Vector2[]} data
   */
  static initCanvas2D(geometry) {
    geometry.drawable = new Path2D()
    const positions = geometry.attributes["position"]
    if (!positions) return warnOnce("The `position` attribute should be available in `BufferGeometry` to use `Renderer2D` ")
    vertices(geometry.drawable, positions, true)
  }
  static setAttribute(geometry, name, attribute) {
    geometry.attributes[name] = attribute
  }
}