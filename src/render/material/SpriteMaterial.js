import { drawImage } from "../utils/canvasfunc.js"
/**
 * 
 * @implements Material
 */
export class SpriteMaterial {
  /**
   * @type {HTMLImageElement}
   */
  img = null
  /**
   * The index of the current action.
   * 
   * @private
   * @type {number}
   */
  _index = 0
  /**
   * The current action's max frame index.
   * 
   * @private
   * @type {number}
   */
  _maxFrame = 0
  /**
   * The current frame of an action.
   * 
   * @private
   * @type {number}
   */
  _frame = 0
  /**
   * Used with ImageSprite#frameRate to throttle the fps of the sprite.
   * 
   * @private
   * @type {number}
   */
  _accumulator = 0
  /**
   * The maximum frames for each given action.
   * 
   * @type {number}
   */
  frameRate = 1 / 60
  /**
   * The current action.
   * 
   * @private
   * @type {number[]}
   */
  _maxFrames = []
  /**
   * @type {Vector}
  /**
   * The width of the sprite.
   * 
   * @type {number}
   */
  width = 0
  /**
   * The height of the sprite..
   * 
   * @type {number}
   */
  height = 0
  /**
   * The width of a frame.
   * 
   * @private
   * @type {number}
   */
  frameWidth = 0
  /**
   * The height of a frame..
   * 
   * @private
   * @type {number}
   */
  frameHeight = 0
  /**
   * @param {HTMLImageElement} img Image to draw
   * @param {number} [frames] Number of cutouts in the sprite in the X axis of the image.
   * @param {number} [actions] Number of cutouts in the sprite in the Y axis of the image.
   */
  constructor(img, frames = 1, actions = 1) {
    this.img = img
    this.setup(frames, actions)
  }
  /**
   * 
   * @param {number} frames
   * @param {number} actions
   */
  setup(frames, actions) {
    this._maxFrame = frames - 1
    this.frameWidth = this.img.width / (frames || 1)
    this.frameHeight = this.img.height / actions
    this.width |= this.frameWidth
    this.height |= this.frameHeight
    for (var i = 0; i < actions; i++) {
      this._maxFrames.push(frames)
    }
  }
  /**
   * Sets max number of frames for a given action
   * 
   * @param {number} action 
   * @param {number} max
   */
  setMaxFrames(action, max) {
    this._maxFrames[action] = max
  }
  /**
   * Sets a given action to be rendered
   * 
   * @param {number} index
   */
  setAction(index) {
    this._maxFrame = (this._maxFrames[index] || 0)
    this._index = index
    this._frame = 0
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   */
  render(ctx, dt) {
    drawImage(
      ctx,
      this.img,
      -this.frameWidth / 2,
      -this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight,
      this._frame,
      this._index,
      this.width,
      this.height
    )
    this._accumulator += dt
    if (this._accumulator < this.frameRate) return
    this._accumulator = 0
    this._frame += 1
    if (this._frame >= this._maxFrame)
      this._frame = 0
  }
}