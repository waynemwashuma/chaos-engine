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
  _origin
  /**
   * @private
   * @type {Vector2}
   */
  _direction
  /**
   * @param {Vector2} origin
   * @param {Vector2} direction
   */
  constructor(origin = new Vector2(0, 1), direction = new Vector2()) {
    this._origin = origin
    this._direction = direction
  }
  /**
   * @type {Vector2}
   */
  get direction() {
    return this._direction
  }
  set direction(x) {
    Vector2.copy(x, this._direction)
  }
  /**
   * @type {Vector2}
   */
  get origin() {
    return this._origin
  }
  set origin(x) {
    Vector2.copy(x, this._origin)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setOrigin(x, y) {
    Vector2.set(this._origin, x, y)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setDirection(x, y) {
    Vector2.set(this._direction, x, y)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  lookAt(x, y) {
    Vector2.set(
      this._direction,
      x - this._origin.x,
      y - this._origin.y
    )
    Vector2.normalize(this._direction, this._direction)
  }
}