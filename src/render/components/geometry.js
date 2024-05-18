import { Vector2 } from "../../math/index.js"
import { warnOnce } from "../../logger/index.js"

/**
 * @template T
 */
export class BufferGeometry {
  /**
   * @type {Record<string,any[] | undefined>}
   */
  attributes = {}
  /**
   * @package
   * @type {T | null}
   */
  drawable = null
  /**
   * @param {BufferGeometry} geometry
   * @param {string} name
   * @param {any[]} attribute
   */
  static setAttribute(geometry, name, attribute) {
    geometry.attributes[name] = attribute
  }
  static quad2D(width, height) {
    let v1 = new Vector2(-width / 2, -height / 2)
    let v2 = new Vector2(-width / 2, height / 2)
    let v3 = new Vector2(width / 2, height / 2)
    let v4 = new Vector2(width / 2, -height / 2)

    const geometry = new BufferGeometry()

    BufferGeometry.setAttribute(geometry, "position", [v1, v2, v3, v4])
    return geometry
  }
  static circle2D(radius) {
    const geometry = new BufferGeometry()

    BufferGeometry.setAttribute(geometry, "position", [radius])
    return geometry
  }
  /**
   * @param {number} base
   * @param {number} height
   * @param {number} angle
   */
  static triangle2D(base, height, angle = Math.asin(height / base)) {
    const geometry = new BufferGeometry()
    const l1 = new Vector2(base)
    const l2 = Vector2.fromAngle(angle)

    Vector2.multiplyScalar(l2, -height / Math.sin(angle), l2)

    const center = new Vector2(
      -(l1.x + l2.x) / 3,
      -l2.y / 3
    )
    BufferGeometry.setAttribute(geometry, "position", [
      center,
      Vector2.add(l1, center, l1),
      Vector2.add(l2, center, l2),
    ])
  }
}