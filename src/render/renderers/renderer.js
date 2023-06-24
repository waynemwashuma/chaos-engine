export class Renderer {
  _accumulator = 0
  objects = []
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  background = null
  /** @type {HTMLCanvasElement}*/
  domElement = null
  /**@type {CanvasRenderingContext2D}*/
  ctx = null
  camera = null
  _update = ()=>{
    this.update.call(this,...arguments)
  }
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas, context) {
    this.domElement = canvas || document.createElement('canvas')
    if (context == void 0)
      throw "Context not provided to renderer."
    this.ctx = context
    this.camera = new Camera(this)
    this.clock = new Clock()
  }
  init(manager) {
    manager.setComponentList("mesh", this.objects)
  }
  
  clear() { 
    
    throw "Override Renderer.clear()"
  }
  update(dt) {
    throw "Override Renderer.update()"
  }
  RAF() {
    this._rafID = requestAnimationFrame(this._update)
  }
  play() {
    this.RAF()
  }
  pause() {
    cancelAnimationFrame(this._rafID)
  }
  bindTo(selector, focus = true) {
    let element = document.querySelector(selector)
    this.domElement.remove()
    this.domElement.style.backgroundColor = "grey"
    this.domElement.style.touchAction = "none"
    element.append(this.domElement)
  }
  add(mesh) {
    this.objects.push(mesh)
  }
  remove(mesh) {
    this.objects.splice(this.objects.indexOf(mesh), 1)
  }
  requestFullScreen() {
    this.domElement.parentElement.requestFullscreen()
  }
}