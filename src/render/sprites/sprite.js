import { Vector, Utils, Angle } from "../../utils/index.js"

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
  _children = []
  /**
   * @private
   */
  parent = null
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
    render.circle(0, 0, 10)
  }
  update(render, dt) {
    let x = this._position.x,
      y = this._position.y

    render.begin()
    render.translate(x, y)
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
    this.bounds = parent.bounds
  }
  /**
   * Adds another sprite to this one
   */
  add(sprite) {
    this._children.push(sprite)
  }
  /**
   * Removes another sprite to this one
   */
  remove(sprite, recursive = false, index) {
    let inx = index ?? this._children.indexOf(sprite)
    if (inx !== -1) {
      Utils.removeElement(this._children, inx)
      return true
    }
    if (!recursive) return false
    for (var i = 0; i < this._children.length; i++) {
      let t = this._children[i].remove(sprite, recursive, index)
      if (t) return true
    }
    return false
  }
}
Utils.inheritComponent(Sprite)
export {
  Sprite
}