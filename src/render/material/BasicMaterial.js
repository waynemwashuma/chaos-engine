export class BasicMaterial {
  /**
   * 
   * @type string
   * @default "white"
   */
  fill = "white"
  /**
   * 
   * @type string
   * @default "black"
   */
  stroke = "black"
  /**
   * 
   * @type boolean
   * @default false
   */
  wireframe = false
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Path2D} [path]
   */
  render(ctx, path) {
    if (!this.wireframe) {
      ctx.fillStyle = this.fill
      ctx.fill()
    }
    ctx.strokeStyle = this.stroke
    ctx.stroke()
  }
}