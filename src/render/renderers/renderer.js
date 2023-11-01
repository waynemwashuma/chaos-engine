import { Clock } from '../../utils/clock.js'
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
   * @type number
  */
  _rafID = 0
  /**
   * Used to throttle the frame rate.
   * 
   * @private
   * @rype number
   */
  _accumulator = 0
  /**
   * A list of meshes.
   * 
   * @type Sprite[]
   */
  objects = []
  /**
   * Used for monitoring perfomance of the renderer
   * 
   */
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /**
   * @private
   * @type {HTMLCanvasElement}
   */
  domElement = null
  /**@type {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext}*/
  ctx = null
  /**
   * @type {Camera}
   */
  camera = null
  /**
   * @param {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext} context
   * @param {HTMLCanvasElement} canvas element to draw on
   */
  constructor(canvas, context) {
    this.domElement = canvas
    this.ctx = context
    this.camera = new Camera(this)
    this.clock = new Clock()
  }
  /**
   * Instantiates the renderer.
   * 
   * @param {Manager} manager
   */
  init(manager) {
    manager.setComponentList("sprite", this.objects)
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
    this.domElement.remove()
    this.domElement.style.backgroundColor = "grey"
    this.domElement.style.touchAction = "none"
    element.append(this.domElement)
  }
  /**
   * Adds a mesh to the renderer.
   * 
   * @param {Sprite | Group} sprite
   */
  add(sprite) {
    this.objects.push(sprite)
  }
  /**
   * Removes the given sprite from the renderer.
   * 
   * @param {Sprite} sprite
   */
  remove(sprite) {
    this.objects.splice(this.objects.indexOf(sprite), 1)
  }
  /**
   * Requests fullscreen for the renderer.
   */
  requestFullScreen() {
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