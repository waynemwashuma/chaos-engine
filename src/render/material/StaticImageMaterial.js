import { drawImage } from "../utils/canvasfunc.js"

export class StaticImageMaterial {
  /**
   * @readonly
   * @type Image
   */
  image = null
  /**
   * 
   * @type number
   */
  width = 100
  /**
   * 
   * @type number
   */
  height = 100
  /**
   * @param {Image} img
   */
  constructor(img) {
    //TODO - Find a way to load images synchronously.
    this.image = img
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height)
  }
}