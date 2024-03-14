import { MaterialType } from "./types.js"
import { drawImage } from "../utils/canvasfunc.js"
import { throws } from "../../logger/index.js"
/**
 * @interface
 */
export class Material {
  type = Material.NULL
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} [path]
   */
  static render(material, ctx, dt, path) {
    switch (material.type) {
      case MaterialType.BASIC:
        if (!material.wireframe) {
          ctx.fillStyle = material.fill
          ctx.fill(path)
        }
        ctx.strokeStyle = material.stroke
        ctx.stroke(path)
        break;
      case MaterialType.TEXT:
        /**@type {TextMetrics}*/
        const metrics = ctx.measureText(this.text)
        const x = material.center ? -metrics.width / 2 : 0
        const y = 0
        ctx.strokeRect = material.color
        ctx.fillStyle = material.color
        ctx.font = material.font
        if (material.fill)
          ctx.fillText(material.text, x, y)
        else
          ctx.strokeText(material.text, x, y)
        break;
      case MaterialType.STATICIMAGE:
        ctx.drawImage(
          material.image,
          material.offset.x,
          material.offset.y,
          material.width,
          material.height
        )
        break;
      case MaterialType.SPRITE:
        drawImage(
          ctx,
          material.img,
          -material.width / 2,
          -material.width / 2,
          material.frameWidth,
          material.frameHeight,
          material._frame,
          material._index,
          material.width,
          material.height
        )
        material._accumulator += dt
        if (material._accumulator < material.frameRate) return
        material._accumulator = 0
        material._frame += 1
        if (material._frame >= material._maxFrame)
          material._frame = 0
        break;
      case MaterialType.STATICIMAGE:
        ctx.drawImage(
          material.image,
          material.offset.x,
          material.offset.y,
          material.width,
          material.height
        )
        break;
      default:
        throws("Unsupported Material type")
    }
  }
}