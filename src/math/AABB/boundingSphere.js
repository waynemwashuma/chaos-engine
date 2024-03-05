import { Overlaps } from "./overlap.js"

/**
 * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingCircle {
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
   * Checks to see if this intersects with another bounding box
   * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
   **/
  intersects(bound) {
    if (bound.r)
      return Overlaps.boundSpheresColliding(this, bound)
    return Overlaps.AABBvsSphere(bound, this)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    this.pos.x += x
    this.pos.y += y
  }
  toJson() {
    return {
      posX: this.pos.x,
      posY: this.pos.y,
      r: this.r
    }
  }
  fromJson(obj) {
    this.pos.x = obj.posX
    this.pos.y = obj.posY
    this.r = obj.r
  }
}