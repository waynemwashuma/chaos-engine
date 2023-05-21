import { Angle, Vector,Matrix } from "../utils/index.js"
class Camera {
  _position = new Vector()
  constructor(renderer, position) {
    this.transformMatrix = new Matrix()
    this.target = null
    this.lerpFactor = 0.5
    this.renderer = renderer
    this.position.set(position?.x || 0, position?.y || 0)
    this.orientation = new Angle()
  }
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  get transform() {
    return this.position
  }
  update(ctx) {
    this._position.lerp(
      this.target,
      this.lerpFactor
    )
  }
  clear(ctx) {
    ctx.setTransform()
  }
  dispose() {
    this.renderer = null
  }
  follow(position) {
    this.target = position
  }
}
export {
  Camera
}