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
   * @type {number}
   */
  _rafID = 0
  /**
   * Used to throttle the frame rate.
   * 
   * @private
   * @type {number}
   */
  _accumulator = 0
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
    this.clock = new Clock()
    this._update = (/** @type {number} */ dt)=>{this.update(dt)}
  }
  /**
   * Clears the canvas on which the renderer draws on.
   */
  clear() {

    throw "Override Renderer.clear()"
  }
  /**
   * Updates the objects within the renderer.
   * 
   * @param {number} dt
   */
  update(dt) {
    throw "Override Renderer.update()"
  }
  /**
   * Requests an animation frame.
   * 
   * @protected
   */
  RAF() {
    this._rafID = requestAnimationFrame(this._update)
  }
  /**
   * Starts the rendering cycle of a renderer.
   */
  play() {
    this.RAF()
  }
  /**
   * Stops the rendering cycle of a renderer.
   */
  pause() {
    cancelAnimationFrame(this._rafID)
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * 
   * @param {string} selector A css selector string that is passed to document.querySelector
   * @param {true} focus whether to shift focus of input to the element pr not
   */
  bindTo(selector, focus = true) {
    let element = document.querySelector(selector)
    if(!element)return console.error("could not find container for the canvas.");
    this.domElement.remove()
    this.domElement.style.backgroundColor = "grey"
    this.domElement.style.touchAction = "none"
    element.append(this.domElement)
  }
  /**
   * Requests fullscreen for the renderer.
   */
  requestFullScreen() {
    // @ts-ignore
    this.domElement.parentElement.requestFullscreen()
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * 
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   */
  setViewport(w, h) {
    let canvas = this.domElement
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