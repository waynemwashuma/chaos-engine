import { MaterialType } from "./types.js"
import { drawImage } from "../utils/canvasfunc.js"
import { throws } from "../../logger/index.js"
/**
 * @interface
 */
export class Material {
  type = MaterialType.NULL
  /**
   * @param {Material} material
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} [path]
   */
  static render(material, ctx, dt, path) {
    switch (material.type) {
      case MaterialType.BASIC:
        // @ts-ignore
        if (!material.wireframe) {
          // @ts-ignore
          ctx.fillStyle = material.fill
          // @ts-ignore
          ctx.fill(path)
        }
        // @ts-ignore
        ctx.strokeStyle = material.stroke
        // @ts-ignore
        ctx.stroke(path)
        break;
      case MaterialType.TEXT:
        /**@type {TextMetrics}*/
        // @ts-ignore
        const metrics = ctx.measureText(this.text)
        // @ts-ignore
        const x = material.center ? -metrics.width / 2 : 0
        const y = 0
        // @ts-ignore
        ctx.strokeRect = material.color
        // @ts-ignore
        ctx.fillStyle = material.color
        // @ts-ignore
        ctx.font = material.font
        // @ts-ignore
        if (material.fill)
          // @ts-ignore
          ctx.fillText(material.text, x, y)
        else
          // @ts-ignore
          ctx.strokeText(material.text, x, y)
        break;
      case MaterialType.STATICIMAGE:
        ctx.drawImage(
          // @ts-ignore
          material.image,
          // @ts-ignore
          material.offset.x,
          // @ts-ignore
          material.offset.y,
          // @ts-ignore
          material.width,
          // @ts-ignore
          material.height
        )
        break;
      case MaterialType.SPRITE:
        drawImage(
          ctx,
          // @ts-ignore
          material.img,
          // @ts-ignore
          -material.width / 2,
          // @ts-ignore
          -material.width / 2,
          // @ts-ignore
          material.frameWidth,
          // @ts-ignore
          material.frameHeight,
          // @ts-ignore
          material._frame,
          // @ts-ignore
          material._index,
          // @ts-ignore
          material.width,
          // @ts-ignore
          material.height
        )
        // @ts-ignore
        material._accumulator += dt
        // @ts-ignore
        if (material._accumulator < material.frameRate) return
        // @ts-ignore
        material._accumulator = 0
        // @ts-ignore
        material._frame += 1
        // @ts-ignore
        if (material._frame >= material._maxFrame)
          // @ts-ignore
          material._frame = 0
        break;
      case MaterialType.STATICIMAGE:
        ctx.drawImage(
          // @ts-ignore
          material.image,
          // @ts-ignore
          material.offset.x,
          // @ts-ignore
          material.offset.y,
          // @ts-ignore
          material.width,
          // @ts-ignore
          material.height
        )
        break;
      default:
        throws("Unsupported Material type")
    }
  }
}