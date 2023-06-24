import { Clock } from '../../utils/clock.js'
import { Camera } from "../camera.js"


export class Renderer {
  _accumulator = 0
  objects = []
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /** @type {HTMLCanvasElement}*/
  domElement = null
  /**@type {CanvasRenderingContext2D | WebGLRenderingContext}*/
  ctx = null
  camera = null
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas, context) {
    this.domElement = canvas
    this.ctx = context
    console.log(this);
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
  setViewport(w, h) {
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.width = w
    canvas.height = h
  }
}