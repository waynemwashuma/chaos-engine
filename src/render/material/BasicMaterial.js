import { Material } from "./material.js"
import { MaterialType } from "./types.js"
import { deprecate } from "../../logger/index.js"
/**
 * 
 */
export class BasicMaterial extends Material {
  type = MaterialType.BASIC
  constructor(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.fill = opts.fill ?? "white"
    opts.uniforms.stroke = opts.stroke ?? "black"
    opts.uniforms.wireframe = opts.wireframe ?? false
    super(opts)
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default false
   */
  get wireframe() {
    deprecate("BasicMaterial().wireframe")
    return this._uniforms["wireframe"].value
  }
  set wireframe(x) {
    deprecate("BasicMaterial().wireframe")
    this._uniforms["wireframe"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default "black"
   */
  get stroke() {
    deprecate("BasicMaterial().stroke")
    return this._uniforms["stroke"].value
  }
  set stroke(x) {
    deprecate("BasicMaterial().stroke")
    this._uniforms["stroke"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default "white"
   */
  get fill() {
    deprecate("BasicMaterial().fill")
    return this._uniforms["stroke"].value
  }
  set fill(x) {
    deprecate("BasicMaterial().fill")
    this._uniforms["stroke"] = x
  }
}