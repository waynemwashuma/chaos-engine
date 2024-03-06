import { Vector2, Angle } from "../../math/index.js"
/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 * 
 * TODO - ADD id property to this class and Group class.
 */
export class Sprite {
  /**
   * @private
   */
  geometry = null
  /**
   * @private
   */
  material = null
  /**
   * @template {BufferGeometry} T
   * @template {Material} U
   * @param {T} geometry
   * @param {U} material
   */
  constructor(geometry, material) {
    this.geometry = geometry
    this.material = material
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {Sprite} sprite
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
    //console.log(sprite)
    sprite.material.render(ctx, dt, sprite.geometry.drawable)
    ctx.closePath()
    ctx.restore()
  }
  /**
   * 
   */
  toJson() {
    let obj = {
      geometry: this.geometry.toJson(),
      material: this.material.toJson(),
    }
    return obj
  }
  /**
   * 
   */
  fromJson(obj) {
    this.geometry?.fromJson(obj.geometry)
    this.material?.fromJson(obj.material)
  }
}