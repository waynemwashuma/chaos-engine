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
  _fill = "black"
  _stroke = "black"
  frameRate = 1 / 60
  renderLast = []
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas) {
    canvas = canvas || document.createElement("canvas")
    super(canvas,canvas.getContext("2d"))
    
  }
  push() {
    this.ctx.save()
  }
  pop() {
    this.ctx.restore()

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
    if (vertices.length < 2) return;
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
    this.ctx.lineWidth = width
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
  clear() {
    this.reset()
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
      this.objects[i].render(this, dt)
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
