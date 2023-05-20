import { Angle,Vector } from "../utils/index.js"
class Camera {
  _position = new Vector()
  constructor(renderer,position) {
    this.renderer = renderer
    this.position.set(position?.x|| 0,position?.y || 0)
    this.orientation = new Angle()
  }
  get position(){
    return this._position
  }
  set position(x){
    this._position.copy(x)
  }
  get transform(){
    return this.position
  }
  updateCtx(ctx) {
    //ctx.translate(this.position.x,this.position.y)
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
