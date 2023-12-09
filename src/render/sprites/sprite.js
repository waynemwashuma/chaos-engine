import { Vector2, Angle } from "../../math/index.js"
import { Component } from "../../ecs/index.js"

/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 * 
 * @implements Component
 * TODO - ADD id property to this class and Group class.
 */
export class Sprite {
  /**
   * @private
   */
  _position = null
  /**
   * @private
   */
  _orientation = null
  /**
   * @private
   */
  _scale = null
  /**
   * @private
   */
  geometry = null
  /**
   * @private
   */
  material = null
  /**
   * @type Group | null
   */
  parent = null
  /**
   * @param {BufferGeometry} geometry
   * @param {Material} material
   */
  constructor(geometry, material) {
    this.geometry = geometry
    this.material = material
  }
  /**
   * Angle in degrees
   * 
   * @type number
   */
  get angle() {
    return this._orientation.value * 180 / Math.PI
  }
  set angle(x) {
    this._orientation.value = x * Math.PI/180
  }
  /**
   * World space position.
   * 
   * @type Vector2
   */
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  /**
   * Orientation of the sprite
   * 
   * @type Angle
   */
  get orientation() {
    return this._orientation
  }
  set orientation(x) {
    this._orientation.copy(x)
  }
  render(ctx, dt) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(...this._position)
    ctx.rotate(this._orientation.value)
    ctx.scale(...this._scale)
    this.material?.render(ctx,dt,this.geometry?.drawable)
    ctx.closePath()
    ctx.restore()
  }
  /**
   * @param {Entity} entity
   */
  init(entity) {
    if(!entity){
      this._position = new Vector2()
      this._orientation = new Angle()
      this._scale = new Vector2(1,1)
      return
    }
    this.entity = entity
    this.requires(entity,"transform")
    let transform = entity.get("transform")
    this._position = transform.position
    this._orientation = transform.orientation
    //TODO - Correct this later
    this._scale = new Vector2(1,1)
    return this
  }
  toJson(){
    let obj = {
      pos:this._position.toJson(),
      angle:this._orientation.toJson(),
      geometry:this.geometry?.toJson(),
      material:this.material?.toJson(),
      parent:this.parent?.id
    }
    return obj
  }
  fromJson(obj,renderer){
    this.geometry?.fromJson(obj.geometry)
    this.material?.fromJson(obj.material)
    this.position.fromJson(obj.pos)
    this._orientation.fromJson(obj.angle)
    this.parent = renderer.getById(obj.parent)
  }
}
Component.implement(Sprite)