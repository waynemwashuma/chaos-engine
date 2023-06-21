import { Vector, clamp } from "../../utils/index.js"

let tmp = new Vector()
export class Path {
  _points = []
  _index = 0
  speed = 20
  tolerance= 20
  _lerp_t = 0
  _lerpdist = 0
  _way = [0, 1]
  _finished = false
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
    this._lerp_t = 0
    this._finished = false

    return this
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
  update(lerpdist = this._lerpdist) {
    if (this._finished) return this._lerpedPoint
    let dist = tmp.copy(this._points[this._way[0]]).sub(this._points[this._way[1]]).magnitude()
    let current = lerpdist / dist
    this._lerp_t = (this.speed + lerpdist) / dist
    if (this._lerp_t > 1 && (dist - lerpdist) < this.tolerance) {
      if (!this.advance()) this._finished = true
    }
    this._lerp_t = clamp(this._lerp_t, 0, 1)
    Vector.lerp(
      this._points[this._way[0]],
      this._points[this._way[1]],
      this._lerp_t,
      this._lerpedPoint
    )
    return this._lerpedPoint
  }
  current() {
    return [
      this._points[this._way[0]],
      this._points[this._way[1]]
      ]
  }
  point(){
    return this._lerpedPoint
  }
  get path(){
    return this._points
  }
  draw(renderer){
    renderer.begin()
    renderer.vertices(this._points,this.loop)
    renderer.stroke("lightgreen")
    renderer.close()
  }
}