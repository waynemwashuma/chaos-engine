import { Clock } from './clock.js'

class Renderer {
  _accumulator = 0
  constructor(canvas) {
    this.frameRate = 1/60
    this.objects = []
    this.domElement = canvas || document.createElement('canvas')
    this.ctx = this.domElement.getContext('2d')
    this.clock = new Clock()
    this.RAF()
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
    this.clear(this.ctx)
    this.objects.forEach(obj => {
      obj.update(this.ctx, dt)
    })
  }
  RAF() {
    this._rafID = requestAnimationFrame(accumulate => {
      let dt = this.clock.update(accumulate)
      if(this._accumulator < this.frameRate){
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
  bindToHTML(element) {
    this.domElement.remove()
    this.domElement.style.backgroundColor = "gray"
    element.append(this.domElement)
    this.domContainer = element
    this.domElement.width = element.clientWidth
    this.domElement.height = element.clientHeight
    element.addEventListener("resize", e => {
      this.domElement.width = element.clientWidth
      this.domElement.height = element.clientHeight
    })
  }
  add(node) {
    this.objects.push(node)
  }
  remove(node) {
    this.objects.splice(this.objects.indexOf(node), 1)
  }
}
let renderer = new Renderer()
export {
  Renderer,
  renderer
}