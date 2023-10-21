import { Angle,Vector } from "../utils/index.js"
class Camera {
  _position = new Vector()
  constructor(renderer,position) {
    this.position
    this.renderer = renderer
    this.position.set(position?.x|| 0,position?.y || 0)
    this.rotation = new Angle()
  }
  get position(){
    return this._position
  }
  set position(x){
    this._position.copy(x)
  }
  updateCtx(ctx) {
    //ctx.scale(1, -1)
    ctx.translate(this.renderer.width / 2 + this.position.x, this.renderer.height / 2 + this.position.y)
  }
  clear(ctx) {
    ctx.setTransform()
  }
  dispose(){
    this.renderer = null
  }
}
export {
  Camera
}