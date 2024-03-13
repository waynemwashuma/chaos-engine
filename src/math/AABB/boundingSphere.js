import { BoundingBox } from "./boundingBox.js"
import { boundSpheresColliding,AABBvsSphere,BoundType } from "./overlap.js"
import {Logger} from "../../logfer/index.js"
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
    if (bound.type === BoundType.CIRCLE)
      return boundSpheresColliding(this, bound)
    return AABBvsSphere(bound, this)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    this.pos.x += x
    this.pos.y += y
  }
}