import { Sprite } from "./sprite.js"


/**
 * Renders a single image with no frames.
 * 
 * @augments Sprite
*/
class StaticImageSprite extends Sprite {
  /**
   * @param {HTMLImageElement} img Image to draw
  */
  constructor(img) {
    super()
    this.img = img
    img.onload = () => {
      this.width = img.width
      this.height = img.height
    }
    this.width = 0
    this.height = 0
    this.frameWidth = 0
    this.frameHeight = 0
  }
  /**
   * @param {Renderer} ctx
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
  render(renderer, dt) {
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
  StaticImageSprite
}