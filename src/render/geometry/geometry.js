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
  drawable = null
  /**
   * @param { Vector2[]} vertices
   */
  /**
   * @param {BufferGeometry} geometry
   */
  static initCanvas2D(geometry) {
    geometry.drawable = new Path2D()
    const positions = geometry.attributes["position"]
    if (!positions) return warnOnce("The `position` attribute should be available in `BufferGeometry` to use `Renderer2D` ")
    vertices(geometry.drawable, positions, true)
  }
  /**
   * @param {BufferGeometry} geometry
   * @param {string} name
   * @param {any[]} attribute
   */
  static setAttribute(geometry, name, attribute) {
    geometry.attributes[name] = attribute
  }
}