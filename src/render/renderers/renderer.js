import { Camera2D } from "../camera.js"


class Viewport {
  /**
   * @readonly
   * @type {HTMLCanvasElement}
   */
  domElement
  constructor(options = {}) {
    this.domElement = options.canvas || document.createElement("canvas")
    if (!this.domElement.parentElement)
      Viewport.bindTo(this, document.body)
    Viewport.set(
      this,
      options.width ?? 250,
      options.height ?? 250
    )
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * @param {HTMLElement} element A css selector string that is passed to document.querySelector
   * @param {boolean} focus whether to shift focus of input to the element pr not
   * @param {Viewport} viewport
   */
  static bindTo(viewport, element) {
    viewport.domElement.remove()
    element.append(viewport.domElement)
  }
  /**
   * Requests fullscreen for the renderer.
   * 
   * @param {Viewport} viewport
   */
  static requestFullScreen(viewport) {
    const parent = viewport.domElement.parentElement
    if (parent) return parent.requestFullscreen()
    return viewport.domElement.requestFullscreen()
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * 
   * 
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   * @param {Viewport} viewport
   */
  static set(viewport, w, h) {
    const canvas = viewport.domElement
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.width = w * devicePixelRatio
    canvas.height = h * devicePixelRatio
  }
}
/**
 * This is an abstract class from which different types of renderers are implemented.
 * 
 * @deprecated
 * @abstract
 * @see Renderer2D
 * @see WebGLRenderer
 * @see WebGPURenderer
 */
export class Renderer extends Viewport {
  /**
   * @type {Camera2D}
   */
  camera
  /**
   * @param {HTMLCanvasElement} canvas element to draw on
   */
  constructor(canvas) {
    super(canvas)
    this.domElement = canvas
    this.camera = new Camera2D()
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * 
   * @deprecated
   * @param {HTMLElement} element A css selector string that is passed to document.querySelector
   * @param {boolean} focus whether to shift focus of input to the element pr not
   * @param {Viewport} renderer
   */
  static bindTo(renderer, element, focus = true) {
    if(typeof element === "string"){
      element = document.querySelector(element)
    }
    if (!element) return console.error("could not find container for the canvas.");
    renderer.domElement.remove()
    renderer.domElement.style.backgroundColor = "grey"
    renderer.domElement.style.touchAction = "none"
    element.append(renderer.domElement)
  }
  /**
   * Requests fullscreen for the renderer.
   * 
   * @deprecated
   * @param {Renderer} renderer
   */
  static requestFullScreen(renderer) {
    const parent = renderer.domElement.parentElement
    if (parent) return parent.requestFullscreen()
    return renderer.domElement.requestFullscreen()
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * 
   * @deprecated
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   * @param {Renderer} renderer
   */
  static setViewport(renderer, w, h) {
    const canvas = renderer.domElement
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.width = w * devicePixelRatio
    canvas.height = h * devicePixelRatio
  }
  /**
   * Width of the renderer
   * 
   * @type number
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
   * @type number
   */
  get height() {
    return this.domElement.height
  }
  set height(x) {
    this.domElement.height = x
  }
}