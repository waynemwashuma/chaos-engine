import { Vector2 } from "../math/index.js"

export class Ray {
  /**
   * @type {number}
   */
  maxLength = 1000;
  /**
   * @private
   * @type {Vector2}
   */
  origin
  /**
   * @private
   * @type {Vector2}
   */
  direction
  /**
   * @param {Vector2} origin
   * @param {Vector2} direction
   */
  constructor(origin = new Vector2(0, 1), direction = new Vector2()) {
    this.origin = origin
    this.direction = direction
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setOrigin(x, y) {
    Vector2.set(this.origin, x, y)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setDirection(x, y) {
    Vector2.set(this.direction, x, y)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  lookAt(x, y) {
    Vector2.set(
      this.direction,
      x - this.origin.x,
      y - this.origin.y
    )
    Vector2.normalize(this.direction, this.direction)
  }
}