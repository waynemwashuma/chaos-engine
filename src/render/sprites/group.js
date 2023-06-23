//import { Sprite } from "./sprite.js"

export class Group {
  constructor(sprites = []) {
    this._children = sprites
    this.parent = null
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "group"
  }
  add(sprite) {
    this._children.push(sprite)
    sprite.parent = this
  }
  /**
   * Removes another sprite to this one
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
  render(render, dt) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].render(render, dt)
    }
  }
}