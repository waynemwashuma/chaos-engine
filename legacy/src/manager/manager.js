import { World } from "../physics/index.js"
import { Renderer } from "../render/renderer.js"
import { Clock } from "../utils/clock.js"
import { Input, EventHandler, EventDispatcher } from "../inputs/index.js"
class Manager {
  world = new World()
  clock = new Clock()
  eventHandler = new EventHandler()
  objects = []
  _accumulator = 0
  frameRate = 0
  perfomance = {
    dt: 0,
    timeStamp: 0,
    renderer: 0,
    physics: 0,
    total: 0,
    framerate: 0,
    actualtate: 0
  }
  constructor(canvas) {
    this.renderer = new Renderer(canvas)
    this.input = new Input(this.eventHandler)
    this.eventDispatcher = this.world.eventDispatcher || new eventDispatcher()
    this.init()
  }
  init() {
    this.play()
    this.objects.forEach(ob => {
      ob.init(this)
    })
  }
  add(object) {
    if (object.mesh) this.renderer.add(object.mesh)
    if (object.body) this.world.add(object.body)
    this.objects.push(object)
    object.init(this)
  }
  remove(object) {
    if (object.mesh)
      this.renderer.remove(object.mesh)
    if (object.body)
      this.world.remove(object.body)
    this.objects.splice(this.objects.indexOf(object), 1)
    object._parent = null
  }
  clear(){
    for (var i = this.objects.length - 1; i >= 0; i--) {
      this.remove(this.objects[i])
    }
  }
  bindTo(selector) {
    if (typeof selector === "string")
      selector = document.querySelector(selector)
    this.renderer.bindToHTML(selector)
  }
  RAF() {
    this._rafID = requestAnimationFrame(accumulate => {
      let dt = this.clock.update(accumulate)
      if (this._accumulator < this.frameRate) {
        this._accumulator += dt
        this.RAF()
        return
      }
      this.update(this._accumulator || dt)
      this._accumulator = 0
      this.RAF()
    })
  }
  play() {
    this.RAF()
  }
  pause() {
    cancelAnimationFrame(this._rafID)
  }
  update(dt) {
    let totalTS = performance.now()
    this.eventDispatcher.clear()
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(dt)
    }
    let phyTs = performance.now()
    this.world.update(dt)
    this.perfomance.physics = performance.now() - phyTs
    this.eventDispatcher.update()
    let renderTS = performance.now()
    this.renderer.update(dt)
    this.perfomance.renderer = performance.now() - renderTS
    this.perfomance.total = performance.now() - totalTS
    this.perfomance.actualrate = 1000 / this.perfomance.total
    this.perfomance.framerate = 1000 / (dt * 1000)
  }
  get width() {
    return this.renderer.width
  }
  get height() {
    return this.renderer.height
  }
}
export {
  Manager
}