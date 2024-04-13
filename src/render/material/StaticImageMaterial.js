import { MaterialType } from "./types.js"
import { Material } from "././material.js"
import { deprecate } from "../../logger/index.js"

/**
 * 
 */
export class StaticImageMaterial extends Material {
  type = MaterialType.STATICIMAGE
  /**
   * @param {Image} img
   */
  constructor(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.image = opts.image ?? new Image()
    opts.uniforms.width = opts.width ?? 100
    opts.uniforms.height = opts.height ?? 100
    super(opts)

  }
  /**
   * 
   * @deprecated
   * @type {String}
   */
  get image() {
    deprecate("StaticImageMaterial().image")
    return this._uniforms["image"].value
  }
  set image(x) {
    deprecate("StaticImageMaterial().image")
    this._uniforms["image"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   */
  get offset() {
    deprecate("StaticImageMaterial().offset")
    return this._uniforms["offset"].value
  }
  set offset(x) {
    deprecate("StaticImageMaterial().offset")
    this._uniforms["offset"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get height() {
    deprecate("StaticImageMaterial().height")
    return this._uniforms["height"].value
  }
  set height(x) {
    deprecate("StaticImageMaterial().height")
    this._uniforms["height"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get width() {
    deprecate("StaticImageMaterial().width")
    return this._uniforms["width"].value
  }
  set width(x) {
    deprecate("StaticImageMaterial().width")
    this._uniforms["width"] = x
  }
}