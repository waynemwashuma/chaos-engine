import { Material } from "././material.js"

/**
 * Material for rendering text.
 */
export class TextMaterial extends Material {
  /**
   * @type {String}
   */
  text = ""
  /**
   * @type {boolean}
   */
  center = false
  /**
   * @type {String}
   */
  color = "white"
  /**
   * @type {boolean}
   */
  fill = true
  /**
   * @type {String}
   */
  font = "16px sans-serif"
  /**
   * @param {String} text
   */
  constructor(text) {
    super()
    this.text = text
  }
  /**
   * @inheritdoc
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    /**@type {TextMetrics}*/
    const metrics = ctx.measureText(this.text)
    const x = this.center ? -metrics.width / 2 : 0
    const y = 0
    ctx.strokeRect = this.color
    ctx.fillStyle = this.color
    ctx.font = this.font
    if (this.fill)
      ctx.fillText(this.text, x, y)
    else
      ctx.strokeText(this.text, x, y)
  }
}