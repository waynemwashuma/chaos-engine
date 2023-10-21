import { Clock } from '../utils/clock.js'
import { Camera } from "./camera.js"
class Renderer {
  _accumulator = 0
  constructor(canvas) {
    this.frameRate = 1 / 60
    this.objects = []
    this.domElement = canvas || document.createElement('canvas')
    this.ctx = this.domElement.getContext('2d')
    this.camera = new Camera(this)
    this.clock = new Clock()
  }
  get width() {
    return this.domElement.clientWidth
  }
  get height() {
    return this.domElement.clientHeight
  }
  clear(ctx) {
    ctx.clearRect(0, 0, this.domElement.width, this.domElement.height)
  }
  update(dt) {
    this.camera.updateCtx(this.ctx)
    this.clear(this.ctx)
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this.ctx,dt)
    }
    this.camera.clear(this.ctx)
  }
  RAF() {
    this._rafID = requestAnimationFrame(accumulate => {
      let dt = this.clock.update(accumulate)
      if (this._accumulator < this.frameRate) {
        this._accumulator += dt
        this.RAF()
        return
      }
      this.update(dt || this._accumulator)
      this.RAF()
      this._accumulator = 0
    })
  }
  play() {
    this.RAF()
  }
  pause() {
    cancelAnimationFrame(this._rafID)
  }
  bindToHTML(element,focus= true) {
    this.domElement.remove()
    this.domElement.style.backgroundColor = "grey"
    this.domElement.style.touchAction = "none"
    element.append(this.domElement)
    this.updateView(element)
    element.addEventListener("resize", e => {
      this.updateView(element)
    })
    if(focus)this.domElement.focus()
    window.addEventListener("resize", e => {
      this.updateView(element)
    })
  }
  updateView(element){
    this.domContainer = element
    this.domElement.width = element.clientWidth
    this.domElement.height = element.clientHeight
    this.camera.position.set(-this.width/2, -this.height / 2)
  }
  add(body) {
    this.objects.push(body)
  }
  remove(body) {
    this.objects.splice(this.objects.indexOf(body), 1)
  }
  addConstraint(c){
    this.world.addConstraint(c)
  }
}
export {
  Renderer
}