import { Material } from "././material.js"
import { MaterialType } from "./types.js"
import { deprecate } from "../../logger/index.js"

/**
 * Material for rendering text.
 */
export class TextMaterial extends Material {
  type = MaterialType.TEXT
  /**
   * @type {String}
   */
  text = ""
  /**
   * @type {boolean}
   */
  center = false
  /**
   * @type {String}
   */
  stroke = "white"
  /**
   * @type {boolean}
   */
  fill = "white"
  /**
   * @type {String}
   */
  font
  /**
   * @param {String} text
   */
  constructor(opts) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.text = opts.text ?? "Hello there."
    opts.uniforms.font = opts.font ?? "16px sans-serif"
    opts.uniforms.fill = opts.fill ?? "white"
    opts.uniforms.stroke = opts.stroke ?? "white"
    opts.uniforms.center = opts.center ?? true

    super(opts)
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default ""
   */
  get text() {
    deprecate("TextMaterial().text")
    return this._uniforms["text"].value
  }
  set text(x) {
    deprecate("TextMaterial().text")
    this._uniforms["text"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default false
   */
  get center() {
    deprecate("TextMaterial().center")
    return this._uniforms["center"].value
  }
  set center(x) {
    deprecate("TextMaterial().center")
    this._uniforms["center"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get font() {
    deprecate("TextMaterial().font")
    return this._uniforms["font"].value
  }
  set font(x) {
    deprecate("TextMaterial().font")
    this._uniforms["font"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get fill() {
    deprecate("TextMaterial().fill")
    return this._uniforms["fill"].value
  }
  set fill(x) {
    deprecate("TextMaterial().fill")
    this._uniforms["fill"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get stroke() {
    deprecate("TextMaterial().stroke")
    return this._uniforms["stroke"].value
  }
  set stroke(x) {
    deprecate("TextMaterial().stroke")
    this._uniforms["stroke"] = x
  }
}