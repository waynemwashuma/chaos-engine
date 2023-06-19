import { Vector } from "../../utils/index.js"

let tmp = new Vector()
export class Path {
  _points = []
  _index = 0
  _speed = 2
  _lerp_t = 0
  _way = [0, 1]
  _lerpedPoint = new Vector()
  loop = false
  add(point) {
    this._points.push(point)

    return this
  }

  clear() {
    this._points.length = 0
    this._way[0] = 0
    this._way[1] = 0
    this._lerp_t = 1

    return this
  }
  remove() {

  }
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
  update(dt) {
    let dist = tmp.copy(this._points[this._way[0]]).sub(this._points[this._way[1]]).magnitudeSquared()
    this._lerp_t += this._speed / dist
    if (this._lerp_t > 1) {
      this.advance()
    }
    return this._lerpedPoint
  }
}