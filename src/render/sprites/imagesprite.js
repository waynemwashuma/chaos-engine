import { Sprite } from "./sprite.js"
import { drawImage } from "../utils/index.js"

/**
 * Renders an image-sprite frame by frame.
 * The frames of the image should have equal width and height in respect to each other.
 * 
 * @augments Sprite
 */
class ImageSprite extends Sprite {
  /**
   * The index of the current action.
   * 
   * @private
   * @type number
   */
  _index = 0
  /**
   * The current action's max frame index.
   * 
   * @private
   * @type number
   */
  _maxFrame = 0
  /**
   * The current frame of an action.
   * 
   * @private
   * @type number
   */
  _frame = 0
  /**
   * Used with ImageSprite#frameRate to throttle the fps of the sprite.
   * 
   * @private
   * @type number
   */
  _accumulator = 0
  /**
   * The maximum frames for each given action.
   * 
   * @type number
   */
  frameRate = 1 / 60
  /**
   * The current action.
   * 
   * @private
   * @type number[]
   */
  _maxFrames = null
  /**
   * The width of the sprite.
   * 
   * @type number
   */
  width = 0
  /**
   * The height of the sprite..
   * 
   * @type number
   */
  height = 0
  /**
   * The width of a frame.
   * 
   * @private
   * @type number
   */
  frameWidth = 0
  /**
   * The height of a frame..
   * 
   * @private
   * @type number
   */
  frameHeight = 0
  /**
   * @param {HTMLImageElement} img Image to draw
   * @param {number} [frames] Number of cutouts in the sprite in the X axis of the image.
   * @param {number} [actions] Number of cutouts in the sprite in the Y axis of the image.
   */
  constructor(img, frames = 1, actions = 1) {
    super()
    this.img = img
    this._maxFrame = frames - 1
    img.onload = () => {
      this.width = img.width
      this.height = img.height
      this.frameWidth = img.width / (frames || 1)
      this.frameHeight = img.height / actions
    }
    //TODO - initialize correctly in case the image is already loaded.
    this.width = 0
    this.height = 0
    this.frameWidth = 0
    this.frameHeight = 0
  }
  /**
   * Sets max number of frames for a given action
   * 
   * @param {number} action 
   * @param {number} max
   */
  setMaxFrames(action, max) {
    this._maxFrames = max
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
   * @inheritdoc
   */
  draw(ctx) {
    drawImage(
      ctx,
      this.img,
      -this.frameWidth / 2,
      -this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight,
      this._frame,
      this._index
    )
  }
  /**
   * @inheritdoc
   */
  render(ctx, dt) {
    super.render(ctx, dt)
    this._accumulator += dt
    if (this._accumulator < this._frameRate) return
    this._accumulator = 0
    this._frame += 1
    if (this._frame > this._maxFrame)
      this._frame = 0
  }
}

export {
  ImageSprite
}