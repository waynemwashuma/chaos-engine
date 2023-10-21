import { Angle, Vector, Matrix } from "../math/index.js"
class Camera {
  _position = new Vector()
  constructor(renderer, position) {
    this.transformMatrix = new Matrix()
    this.target = null
    this.lerpFactor = 0.5
    this.renderer = renderer
    this.offset = new Vector()
    this._position = new Vector()
    this._actualPosition = new Vector()
    this.position.set(position?.x || 0, position?.y || 0)
    this.orientation = new Angle()
  }
  get position() {
    return this._actualPosition
  }
  set position(x) {
    this._actualPosition.copy(x)
  }
  get transform() {
    return this.position
  }
  update() {
    if (this.target)
      Vector.lerp(
        this._position,
        this.target,
        this.lerpFactor,
        this._position
      )
    this._actualPosition
      .copy(this._position)
      .add(this.offset)
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