import { Clock } from '../utils/clock.js'
import { Camera } from "./camera.js"
import { Vector } from '../utils/index.js'

/**


*/
class Renderer {
  _accumulator = 0
  _transforms = []
  _rotation = 0
  _translation = new Vector()
  _scale = new Vector()
  _fill = "black"
  _stroke = "black"
  frameRate = 1 / 60
  objects = []
  renderLast = []
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
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas) {
    this.domElement = canvas || document.createElement('canvas')

    this.ctx = this.domElement.getContext('2d')
    this.camera = new Camera(this)
    this.clock = new Clock()
  }
  init(manager) {
    manager.setComponentList("mesh", this.objects)
  }
  push() {
    this._transforms.push(this.ctx.getTransform())
  }
  pop() {
    this.ctx.setTransform(this._transforms.pop())

  }
  reset() {
    this.ctx.setTransform()
  }
  translate(x, y) {
    this.ctx.translate(x, y)
  }
  scale(x, y) {
    this.ctx.scale(x, y)
  }
  rotate(rad) {
    this.ctx.rotate(rad)
    this._rotation += rad
  }
  line(x1, y1, x2, y2) {
    this.ctx.moveTo(
      x1 - this.camera.position.x,
      y1 - this.camera.position.y
    )
    this.ctx.lineTo(
      x2 - this.camera.position.x,
      y2 - this.camera.position.y
    )
  }
  rect(x, y, w, h) {
    this.ctx.rect(
      x - this.camera.position.x,
      y - this.camera.position.y,
      w,
      h
    )
  }
  circle(x, y, r) {
    this.ctx.arc(
      x - this.camera.position.x,
      y - this.camera.position.y,
      r, 0, Math.PI * 2
      )
  }
  vertices(vertices, close = true) {
    this.ctx.moveTo(
      vertices[0].x - this.camera.position.x,
      vertices[0].y - this.camera.position.y)
    for (var i = 1; i < vertices.length; i++) {
      this.ctx.lineTo(
        vertices[i].x - this.camera.position.x,
        vertices[i].y - this.camera.position.y
      )
    }
    if (close)
      this.ctx.lineTo(
        vertices[0].x - this.camera.position.x,
        vertices[0].y - this.camera.position.y
      )
  }
  arc(x, y, r, start, end) {
    this.ctx.arc(
      x - this.camera.position.x,
      y - this.camera.position.y,
      r, start, end
    )
  }
  fillText(text, x, y) {
    this.ctx.fillText(text,
      x - this.camera.position.x,
      y - this.camera.position.y
    )
  }
  fill(color = "black", fillRule) {
    this.ctx.fillStyle = color
    this.ctx.fill(fillRule)
  }
  stroke(color = "black", width = 1) {
    this.ctx.strokeStyle = color
    this.ctx.width = width
    this.ctx.stroke()
  }
  begin() {
    this.ctx.beginPath()
  }
  close() {
    this.ctx.closePath()
  }
  clip() {
    this.ctx.clip()
  }
  drawImage(
    img,
    x,
    y,
    w = img.width,
    h = img.height,
    ix = 0,
    iy = 0
  ) {
    this.ctx.drawImage(img, w * ix, h * iy, w, h,
      x - this.camera.position.y,
      y - this.camera.position.y,
      w, h)
  }
  get width() {
    return this.domElement.clientWidth
  }
  get height() {
    return this.domElement.clientHeight
  }
  set width(x) {
    this.domElement.width = x
  }
  set height(x) {
    this.domElement.height = x
  }
  setViewport(w, h) {
    this.width = w
    this.height = h
  }
  set CSSbackground(x) {
    this.domElement.style.background = x
  }
  get CSSbackground() {
    return this.domElement.style.background
  }
  clear() {
    this.reset()
    let h = this.height,
      w = this.width
    this.ctx.clearRect(0, 0, w, h)
  }
  update(dt) {

    this.perf.lastTimestamp = performance.now()
    //this.clear(this.ctx)
    if (this.background != void 0)
      this.background.update(this, dt)
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this, dt)
    }
    for (var i = 0; i < this.renderLast.length; i++) {
      this.renderLast[i].update(this, dt, this.camera.transform)
    }
    this.perf.total = performance.now() - this.perf.lastTimestamp
  }
  _update = accumulate => {
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
  addUI(mesh) {
    this.renderLast.push(mesh)
  }
  requestFullScreen() {
    this.domElement.parentElement.requestFullscreen()
  }
}
export {
  Renderer
}