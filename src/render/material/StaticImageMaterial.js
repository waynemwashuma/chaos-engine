/**
 * 
 * @implements Material
 */
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
   * @type Vector_like
   */
  offset = {
    x: 0,
    y: 0
  }
  /**
   * @param {Image} img
   */

  constructor(img, width = 100, height = 100) {
    //TODO - Find a way to load images synchronously.
    this.image = img
    this.width = width
    this.height = height
    this.offset.x = -width/2
    this.offset.y = -height/2
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height)
  }
}