import { Sprite } from "./sprite.js"

/**
 * Used for grouping similar.
 * 
 * @augments Sprite
 */
export class Group extends Sprite {
  /**
   * @private
   * @type Sprite[]
   */
  _children = null
  /**
   * @private
   * @type Group
   */
  parent = null
  /**
   * @param {Sprite[]} sprites
   */
  constructor(sprites = []) {
    super()
    this._children = sprites
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "group"
  }

  /**
   * Adds another sprite to this one
   * 
   * @param {Sprite | Group} sprite
   */
  add(sprite) {
    this._children.push(sprite)
    sprite.parent = this
  }
  /**
   * Removes another sprite to this one
   * 
   * @param {Sprite | Group} sprite
   * @param {boolean} [recursive=false]
   * @param {number} [index]
   */
  remove(sprite, recursive = false, index) {
    let inx = index ?? this._children.indexOf(sprite)
    if (inx !== -1) {
      this._children[inx].parent = null
      Utils.removeElement(this._children, inx)
      return true
    }
    if (!recursive) return false
    for (var i = 0; i < this._children.length; i++) {
      if (this._children.CHAOS_OBJ_TYPE == "group") {
        let t = this._children[i].remove(sprite, recursive, index)
        if (t) return true
      }
    }
    return false
  }
  /**
   * @inheritdoc
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   */
  render(ctx, dt) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].render(ctx, dt)
    }
  }
}
