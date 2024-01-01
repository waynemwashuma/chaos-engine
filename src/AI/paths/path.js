import { Vector2, clamp } from "../../math/index.js"
import { vertices, stroke } from "../../render/index.js"

let tmp = new Vector2()
export class Path {
  /**
   * @private
   * type Vector2[]
   */
  _points = []
  /**
   * @private
   * type number 
   */
  _index = 0
  /**
   * type number 
   */
  speed = 20
  /**
   * type number 
   */
  tolerance = 20
  /**
   * @private
   * type number 
   */
  _lerp_t = 0
  /**
   * @private
   * type number 
   */
  _lerpdist = 0
  /**
   * @private
   * type number[]
   */
  _way = [0, 1]
  /**
   * @private
   * type boolean 
   */
  _finished = false
  /**
   * @private
   * type Vector2 
   */
  _lerpedPoint = new Vector2()
  /**
   * type boolean 
   */
  loop = false
  /**
   * @param { Vector2} point
   */
  add(point) {
    this._points.push(point)

    return this
  }
  clear() {
    this._points.length = 0
    this._way[0] = 0
    this._way[1] = 0
    this._lerp_t = 0
    this._finished = false

    return this
  }
  /**
   * @private
   */
  advance() {
    if (this._points.length < 2) return false
    if (this._way[1] == this._points.length - 1 &&
      !this.loop) return false
    if (
      this._way[1] == this._points.length - 1 &&
      this.loop
    ) {
      this._way[0] = this._points.length - 1
      this._way[1] = 0
      this._lerp_t = 0
      return true
    }
    this._way[0] = this._way[1]
    this._way[1] += 1
    this._lerp_t = 0
    return true
  }
  /**
   * 
   * @param {number} lerpdist
   */
  update(lerpdist = this._lerpdist) {
    if (this._finished) return this._lerpedPoint
    let dist = tmp.copy(this._points[this._way[0]]).sub(this._points[this._way[1]]).magnitude()
    this._lerp_t = (this.speed + lerpdist) / dist
    if (this._lerp_t > 1 && (dist - lerpdist) < this.tolerance) {
      if (!this.advance()) this._finished = true
    }
    this._lerp_t = clamp(this._lerp_t, 0, 1)
    Vector2.lerp(
      this._points[this._way[0]],
      this._points[this._way[1]],
      this._lerp_t,
      this._lerpedPoint
    )
    return this._lerpedPoint
  }
  /**
   * @returns {Vector2[]}
   */
  current() {
    return [
      this._points[this._way[0]],
      this._points[this._way[1]]
      ]
  }
  /**
   * @returns {Vector2}
   */
  point() {
    return this._lerpedPoint
  }
  /**
   * @type {Vector2[]}
   */
  get path() {
    return this._points
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath()
    vertices(ctx, this._points, this.loop)
    stroke(ctx, "lightgreen")
    ctx.closePath()
  }
}