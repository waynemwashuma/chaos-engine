import { Vector, Angle } from "../../math/index.js"
import { Utils } from "../../utils/index.js"

let v = new Vector()

/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 * 
 * @class
 */
class Sprite {
  /**
   * @private
   */
  _position = new Vector()
  /**
   * @private
   */
  _orientation = new Angle()
  scale = new Vector(1, 1)
  /**
   * @private
   */
  geometry = null
  material = null
  parent = null
  constructor(geometry, material) {
    this.geometry = geometry
    this.material = material
  }
  get angle() {
    return this._orientation.radian * 180 / Math.PI
  }
  set angle(x) {
    this._orientation.degree = x
  }
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  get orientation() {
    return this._orientation
  }
  set orientation(x) {
    this._orientation.copy(x)
  }
  /**
   * Override this function.
   * The canvas is already transformed to the position and rotation of the sprite.
   * 
   */
  draw(render) {
    this.geometry.render(render)
    this.material.render(render)
  }
  render(render, dt) {
    render.begin()
    render.translate(...this._position)
    render.rotate(this._orientation.radian)
    render.scale(...this.scale)
    this.draw(render, dt)
    render.close()
    render.reset()
  }
  init(entity) {
    this.entity = entity
    this.requires("transform")
    let transform = entity.get("transform")
    this._position = transform.position
    this._orientation = transform.orientation
  }


  update() {}
}
Utils.inheritComponent(Sprite)
export {
  Sprite
}