import { BoundingCircle } from "./boundingSphere.js"
import { AABBvsSphere,AABBColliding,BoundType } from "./overlap.js"

/**
 * A rectangular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingBox {
  type = BoundType.bOX
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
    //use bound.type instead
    if (bound.type === BoundType.BOX)
      return AABBvsSphere(this, bound)
    return AABBColliding(this, bound)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    this.min.x += x
    this.min.y += y
    this.max.x += x
    this.max.y += y
  }
  /**
   * Deep copies a bounding box to a new one.
   * 
   * @returns BoundingBox
   */
  clone() {
    return new BoundingBox(this.min.x, this.min.y, this.max.x, this.max.y)
  }
  /**
   * Deep copies another bounding box.
   * 
   * @param {BoundingBox} bounds
   */
  copy(bounds) {
    this.min.x = bounds.min.x
    this.min.y = bounds.min.y
    this.max.x = bounds.max.x
    this.max.y = bounds.max.y
  }
  
  /**
   * Combines two bounds to create a new one that covers the previous two.
   * 
   * @param {BoundingBox} bound1 
   * @param {BoundingBox} bound2 
   * @param {BoundingBox} target Bound to store results into.
   * @returns BoundingBox
   */
  static union(bound1, bound2, target) {
    target = target || new BoundingBox()

    target.max.x = bound1.max.x > bound2.max.x ? bound1.max.x : bound2.max.x
    target.max.y = bound1.max.y > bound2.max.y ? bound1.max.y : bound2.max.y
    target.min.x = bound1.min.x < bound2.min.x ? bound1.min.x : bound2.min.x
    target.min.y = bound1.min.y < bound2.min.y ? bound1.min.y : bound2.min.y
    return target
  }
}