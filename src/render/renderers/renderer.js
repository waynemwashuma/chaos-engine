import { Clock } from '../../math/clock.js'
import { Camera } from "../camera.js"

/**
 * This is an abstract class from which different types of renderers are implemented.
 * 
 * @abstract
 * @see Renderer2D
 * @see WebGLRenderer
 * @see WebGPURenderer
 */
export class Renderer {
  /**
   * @private
   * @type {HTMLCanvasElement}
   */
  domElement
  /**@type {CanvasRenderingContext2D }*/
  ctx
  /**
   * @type {Camera}
   */
  camera
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {HTMLCanvasElement} canvas element to draw on
   */
  constructor(canvas, context) {
    this.domElement = canvas
    this.ctx = context
    this.camera = new Camera()
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * 
   * @param {string} selector A css selector string that is passed to document.querySelector
   * @param {true} focus whether to shift focus of input to the element pr not
   */
  static bindTo(renderer,selector, focus = true) {
    let element = document.querySelector(selector)
    if(!element)return console.error("could not find container for the canvas.");
    renderer.domElement.remove()
    renderer.domElement.style.backgroundColor = "grey"
    renderer.domElement.style.touchAction = "none"
    element.append(renderer.domElement)
  }
  /**
   * Requests fullscreen for the renderer.
   */
  static requestFullScreen(renderer) {
    renderer.domElement.parentElement.requestFullscreen()
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * 
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   */
  static setViewport(renderer,w, h) {
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