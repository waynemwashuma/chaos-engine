import { Vector2 } from "../../math/index.js"
import { BufferGeometry } from "../geometry/index.js"
import { Material } from "../material/index.js"
/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 * 
 * TODO - ADD id property to this class and Group class.
 * * @template {BufferGeometry} T
 * * @template {Material} U
 */
export class Sprite {
  /**
   * @private
   * @type {T}
   */
  geometry
  /**
   * @private
   * @type {U}
   */
  material
  /**
   * @param {T} geometry
   * @param {U} material
   */
  constructor(geometry, material) {
    this.geometry = geometry
    this.material = material
  }
  /**
   * @deprecated
   * @template {BufferGeometry} T
   * @template {Material} U
   * @param {CanvasRenderingContext2D} ctx
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {Sprite<T,U>} sprite
   * @param {number} dt
   */
  static render(
    ctx,
    sprite,
    position,
    orientation,
    scale,
    dt
  ) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(position.x, position.y)
    ctx.rotate(orientation)
    ctx.scale(scale.x, scale.y)
    // @ts-ignore
    Material.render(sprite.material,ctx, dt, sprite.geometry.drawable)
    ctx.closePath()
    ctx.restore()
  }
}