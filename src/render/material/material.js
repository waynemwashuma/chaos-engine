import { MaterialType } from "./types.js"
import { drawImage } from "../utils/canvasfunc.js"
import { throws } from "../../logger/index.js"
/**
 * @interface
 */
export class Material {
  type = MaterialType.NULL
  _uniforms = {}
  constructor(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    for (const key in opts.uniforms) {
      Material.setUniform(this, key, opts.uniforms[key])
    }
  }
  static setUniform(material, name, value) {
    const uniform = material._uniforms[name]
    if (uniform) return uniform.value = value
    material._uniforms[name] = {
      value,
      position: 0
    }
  }
  static getUniform(material, name) {
    const uniform = material._uniforms[name]
    if (!uniform) throws(`The uniform \"${name}\" does not exist on the queried material of type ${material.type}.`)
    return uniform.value
  }
  /**
   * @param {Material} material
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} [path]
   */
  static render(material, ctx, dt, path) {
    switch (material.type) {
      case MaterialType.BASIC:
        renderBasic(ctx, material, path)
        break;
      case MaterialType.TEXT:
        renderText(ctx, material)
        break;
      case MaterialType.STATICIMAGE:
        renderStaticImage(ctx, material)
        break;
      case MaterialType.SPRITE:
        renderSprite(ctx, material, dt)
        break;
      default:
        throws("Unsupported Material type")
    }
  }
}

function renderBasic(ctx, material, path) {
  const wireframe = Material.getUniform(material, 'wireframe')
  const fill = Material.getUniform(material, 'fill')
  const stroke = Material.getUniform(material, 'stroke')
  ctx.fillStyle = fill
  ctx.strokeStyle = stroke
  if (!wireframe)
    ctx.fill(path)
  ctx.stroke(path)
}

function renderText(ctx, material) {
  const text = Material.getUniform(material, 'text')
  const textAlign = Material.getUniform(material, 'center')
  const font = Material.getUniform(material, 'font')
  const fill = Material.getUniform(material, 'fill')
  const stroke = Material.getUniform(material, 'stroke')
  
  ctx.textAlign = textAlign
  ctx.fillStyle = fill
  ctx.strokeStyle = stroke
  ctx.font = font
  ctx.fillText(text, 0, 0)
  ctx.strokeText(text, 0, 0)
}

function renderStaticImage(ctx, material) {
  const image = Material.getUniform(material, 'image')
  const width = Material.getUniform(material, 'width')
  const height = Material.getUniform(material, 'height')

  ctx.drawImage(
    image,
    -width / 2,
    -height / 2,
    width,
    height
  )
}

function renderSprite(ctx, material, dt) {
  const image = Material.getUniform(material, 'image')
  const width = Material.getUniform(material, 'width')
  const height = Material.getUniform(material, 'height')
  const frameWidth = Material.getUniform(material, 'frameWidth')
  const frameHeight = Material.getUniform(material, 'frameHeight')
  const _frame = Material.getUniform(material, '_frame')
  const _index = Material.getUniform(material, '_index')
  const _accumulator = Material.getUniform(material, '_accumulator')
  const frameRate = Material.getUniform(material, 'frameRate')
  const maxFrame = Material.getUniform(material, 'maxFrames')[_index]
  drawImage(
    ctx,
    image,
    -width / 2,
    -height / 2,
    frameWidth,
    frameHeight,
    _frame,
    _index,
    width,
    height
  )
  Material.setUniform(material, "_accumulator", _accumulator + dt)
  if (_accumulator < frameRate) return
  Material.setUniform(material, "_accumulator", 0)
  Material.setUniform(material, "_frame", _frame + 1)
  if (_frame >= maxFrame - 1)
    Material.setUniform(material, "_frame", 0)
}