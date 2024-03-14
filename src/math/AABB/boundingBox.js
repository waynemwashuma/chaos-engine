import { BoundingCircle } from "./boundingSphere.js"
import { AABBvsSphere, AABBColliding, BoundType } from "./overlap.js"
import { Logger } from "../../logger/index.js"

/**
 * A rectangular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingBox {
  type = BoundType.BOX
  /**
   * The upper limit of the bounding box
   * 
   * @type {Vector_like}
   */
  max
  /**
   * The lower limit of the bounding box
   * 
   * @type {Vector_like}
   */
  min
  /**
   * @param {number} [minX=0]
   * @param {number} [minY=0]
   * @param {number} [maxX=0]
   * @param {number} [maxY=0]
   */
  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    this.max = {
      x: maxX,
      y: maxY
    }
    this.min = {
      x: minX,
      y: minY
    }
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param {BoundingCircle | BoundingBox} bound the bound to check  intersection with
   * @returns boolean
   **/
  intersects(bound) {
    Logger.deprecate("BoundingBox().intersects()", "boundsColliding()")
    if (bound.type === BoundType.CIRCLE)
      return AABBvsSphere(this, bound)
    return AABBColliding(this, bound)
  }
  /**
   * @deprecated
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    Logger.deprecate("BoundingBox().translate()", "BoundingBox.translate()")
    return BoundingBox.translate(this,x,y,this)
  }
  /**
   * Deep copies a bounding box to a new one.
   * 
   * @deprecated
   * @returns {BoundingBox}
   */
  clone() {
    Logger.deprecate("BoundingBox().clone()", "BoundingBox.copy()")
    return BoundingBox.copy(this)
  }
  /**
   * Deep copies another bounding box.
   * 
   * @deprecated
   * @param {BoundingBox} bounds
   */
  copy(bounds) {
    Logger.deprecate("BoundingBox().copy()", "BoundingBox.copy()")
    BoundingBox.copy(bounds,this)
  }
  static copy(bound,out = new BoundingBox()){
    out.min.x = bounds.min.x
    out.min.y = bounds.min.y
    out.max.x = bounds.max.x
    out.max.y = bounds.max.y
    
    return out
  }
  static translate(bound, x, y, out = new BoundingBox()) {
    out.min.x = bound.min.x + x
    out.min.y = bound.min.y + y
    out.max.x = bound.max.x + x
    out.max.y = bound.max.y + y
    
    return out
  }
  /**
   * Combines two bounds to create a new one that covers the previous two.
   * 
   * @param {BoundingBox} bound1 
   * @param {BoundingBox} bound2 
   * @param {BoundingBox} target Bound to store results into.
   * @returns BoundingBox
   */
  static union(bound1, bound2, out = new BoundingBox()) {
    out.max.x = bound1.max.x > bound2.max.x ? bound1.max.x : bound2.max.x
    out.max.y = bound1.max.y > bound2.max.y ? bound1.max.y : bound2.max.y
    out.min.x = bound1.min.x < bound2.min.x ? bound1.min.x : bound2.min.x
    out.min.y = bound1.min.y < bound2.min.y ? bound1.min.y : bound2.min.y
    
    return out
  }
}