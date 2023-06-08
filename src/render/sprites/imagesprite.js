import { Sprite } from "./sprite.js"

/**
 * Renders an image-sprite frame by frame.
 * The frames of the image should have equal width and height in respect to each other.
 * 
 * @augments Sprite
 */
class ImageSprite extends Sprite {
  _index = 0
  _maxFrame = 0
  _frame = 0
  _accumulator = 0
  _dt = 0
  frameRate = 1 / 60
  _maxFrames = null
  width = 0
  height = 0
  frameWidth = 0
  frameHeight = 0
  /**
   * @param {HTMLImageElement} img Image to draw
   * @param {number} frames Maximum number of cutouts in the sprite in the X axis of the image.
   * @param {number} actions Maximum number of cutouts in the sprite in the Y axis of the image.
   */
  constructor(img, frames, actions) {
    super()
    this.img = img
    this._maxFrame = (frames || 1) - 1
    img.onload = () => {
      this.width = img.width
      this.height = img.height
      this.frameWidth = img.width / (frames || 1)
      this.frameHeight = img.height / (actions || 1)
    }
    this.width = 0
    this.height = 0
    this.frameWidth = 0
    this.frameHeight = 0
  }
  /**
   * Sets max number of frames for a given action
   * 
   * @param {number} action 
   * @paran {number} max
   */
  setMaxFrames(action, max) {
    this._maxFrames = max
  }
  /**
   * Sets a given action to be rendered
   * 
   * @param {number} action 
   * @paran {number} max
   */
  setAction(index) {
    this._maxFrame = this._maxFrames[index]
    this._index = index
    this._frame = 0
  }
  /**
   * @inheritdoc
   */
  draw(renderer) {
    renderer.drawImage(
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
  update(renderer, dt) {
    super.update(renderer, dt)
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