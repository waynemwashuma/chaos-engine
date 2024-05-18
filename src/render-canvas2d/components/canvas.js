import { assert } from "../../logger/index.js"
export const MaterialType = {
  BASIC: 0,
  IMAGE: 1,
  TEXT: 2
}
/**
 * 
 */
export class Canvas2DMaterial {
  _uniforms = {}
  constructor(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    for (const key in opts.uniforms) {
      Canvas2DMaterial.initUniform(this, key, opts.uniforms[key])
    }
  }
  static initUniform(material, name, value) {
    material._uniforms[name] = {
      value,
      position: 0
    }
  }
  static setUniform(material, name, value) {
    assert(material._uniforms[name], `The uniform \"${name}\" does not exist on the queried material.`)
    material._uniforms[name].value = value
  }
  static getUniform(material, name) {
    assert(material._uniforms[name], `The uniform \"${name}\" does not exist on the queried material.`)
    return material._uniforms[name].value
  }
  
  static basic(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.fill = opts.fill ?? "white"
    opts.uniforms.stroke = opts.stroke ?? "black"
    opts.uniforms.wireframe = opts.wireframe ?? false

    const material = new Canvas2DMaterial(opts)
    material.type = MaterialType.BASIC
    return material
  }
  
  static image(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.image = opts.image ?? new Image()
    opts.uniforms.width = opts.width ?? 100
    opts.uniforms.height = opts.height ?? 100
    opts.uniforms.frameWidth = opts.frameWidth ?? 100
    opts.uniforms.frameHeight = opts.frameHeight ?? 100
    opts.uniforms.frameX = opts.frameX ?? 0
    opts.uniforms.frameY = opts.frameY ?? 0

    const material = new Canvas2DMaterial(opts)
    material.type = MaterialType.IMAGE
    return material
  }
  
  static text(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.text = opts.text ?? "Hello there."
    opts.uniforms.font = opts.font ?? "16px sans-serif"
    opts.uniforms.fill = opts.fill ?? "white"
    opts.uniforms.stroke = opts.stroke ?? "white"
    opts.uniforms.center = opts.center ?? true
    
    const material = new Canvas2DMaterial(opts)
    material.type = MaterialType.TEXT
    return material
  }
}