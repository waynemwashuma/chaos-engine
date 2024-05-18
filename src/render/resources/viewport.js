import { deprecate } from "../../logger/index.js"

export class Viewport {
  /**
   * @readonly
   * @type {HTMLCanvasElement}
   */
  domElement
  /**
   * @type {number}
   */
  width = 0
  /**
   * @type {number}
   */
  height = 0
  constructor(options = {}) {
    this.domElement = options.canvas || document.createElement("canvas")
    if (!this.domElement.parentElement)
      this.bindTo(document.body)
    this.set(
      options.width ?? 250,
      options.height ?? 250
    )
  }
  /**
   * Width of the renderer
   * 
   * @type {number}
   */
  get width() {
    return this.domElement.width
  }
  set width(x) {
    this.domElement.width = x
  }
  /**
   * Height of the renderer
   * 
   * @type {number}
   */
  get height() {
    return this.domElement.height
  }
  set height(x) {
    this.domElement.height = x
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * @param {HTMLElement} element A css selector string that is passed to document.querySelector
   */
  bindTo(element) {
    this.domElement.remove()
    element.append(this.domElement)
  }
  /**
   * Requests fullscreen for the renderer.
   * 
   */
  requestFullScreen() {
    const parent = this.domElement.parentElement
    if (parent) return parent.requestFullscreen()
    return this.domElement.requestFullscreen()
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * 
   * 
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   */
  set(w, h) {
    const canvas = this.domElement
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.width = w * devicePixelRatio
    canvas.height = h * devicePixelRatio
    this.width = canvas.width
    this.height = canvas.height
  }
}