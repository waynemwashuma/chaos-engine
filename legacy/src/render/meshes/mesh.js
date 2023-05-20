import { Vector } from "../../utils/vector.js"
import { Angle } from "../../utils/degree.js"

let v = new Vector()
class Mesh {
  _rotation = new Angle()
  constructor(pos) {
    this._position = new Vector().copy(pos || v)
  }
  get angle() {
    return this._rotation.radian * 180 / Math.PI
  }
  set angle(x) {
    this._rotation.degree = x
  }
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  get rotation(){
    return this._rotation
  }
  set rotation(x){
    this._rotation.copy(x)
  }
  draw(ctx) {
    ctx.arc(0, 0, 10, 0, Math.PI)
  }
  update(ctx,dt) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this._rotation.radian)
    this.draw(ctx,dt)
    ctx.closePath()
    ctx.restore()
  }
  init(parent) {
    this._position = parent.position
    this._rotation = parent.rotation
  }
}
export { Mesh }