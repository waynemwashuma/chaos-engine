import { Clock } from '../../utils/clock.js'
import { Camera } from "../camera.js"
import { Vector } from '../../math/index.js'
import { Renderer } from "./renderer.js"


/**
 * Renders images and paths to the 2D context of a canvas.
 * 
 * @extends Renderer
*/
export class Renderer2D extends Renderer {
  frameRate = 1 / 60
  renderLast = []
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas) {
    canvas = canvas || document.createElement("canvas")
    super(canvas,canvas.getContext("2d"))
    
  }

  add(sprite){
    super.add(sprite)
    sprite.geometry?.init(this.ctx)
    sprite.material?.init(this.ctx)
  }
  clear() {
    this.ctx.setTransform()
    let h = this.height,
      w = this.width
    this.ctx.clearRect(0, 0, w, h)
  }
  update(dt) {
    this.camera.update(dt)
    this.perf.lastTimestamp = performance.now()
    this.clear()
    if (this.background != void 0)
      this.background.update(this, dt)
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(this.ctx, dt)
    }
    for (var i = 0; i < this.renderLast.length; i++) {
      this.renderLast[i].update(this, dt, this.camera.transform)
    }
    this.perf.total = performance.now() - this.perf.lastTimestamp
  }
  _update = (accumulate)=> {
    let dt = this.clock.update(accumulate)
    if (this._accumulator < this.frameRate) {
      this._accumulator += dt
      this.RAF()
      return
    }
    this.update(dt || this._accumulator)
    this.RAF()
    this._accumulator = 0
  }
  
  addUI(mesh) {
    this.renderLast.push(mesh)
  }
  requestFullScreen() {
    this.domElement.parentElement.requestFullscreen()
  }
}
