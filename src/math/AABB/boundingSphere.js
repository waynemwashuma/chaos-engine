import { BoundingBox } from "./boundingBox.js"
import { boundSpheresColliding, AABBvsSphere, BoundType } from "./overlap.js"
import { deprecate } from "../../logger/index.js"
/**
 * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingCircle {
  type = BoundType.CIRCLE
  /**
   * 
   * @type {number}
   */
  r = 0
  /**
   * 
   * @type {Vector_like}
   */
  pos = { x: 0, y: 0 }
  /**
   * @param {number} [r=0]
   */
  constructor(r = 0) {
    this.r = r
  }
  /**
   * 
   * @deprecated
   * Checks to see if this intersects with another bounding box
   * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
   **/
  intersects(bound) {
    deprecate("BoundingCircle().intersects()", "boundsColliding()")
    if (bound.type === BoundType.CIRCLE)
      return boundSpheresColliding(this, bound)
    return AABBvsSphere(bound, this)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    deprecate("BoundingCircle().translate()", "BoundingCircle.translate()")
    this.pos.x += x
    this.pos.y += y
  }
  static translate(bound, x, y, out = new BoundingCircle()) {
    out.pos.x = bound.pos.x + x
    out.pos.y = bound.pos.y + y
    
    return out
  }
  static copy(bound, out = new BoundingCircle()) {
    out.pos.x = bound.pos.x
    out.pos.y = bound.pos.y
    out.r = bound.r

    return out
  }
}