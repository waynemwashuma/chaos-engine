import { throws } from "../../logger/index.js"
/**
 * @interface
 */
export class Material {
  _uniforms = {}
  constructor(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    for (const key in opts.uniforms) {
      Material.setUniform(this, key, opts.uniforms[key])
    }
  }
  static setUniform(material, name, value) {
    const uniform = material._uniforms[name]
    if (uniform) return uniform.value = value
    material._uniforms[name] = {
      value,
      position: 0
    }
  }
  static getUniform(material, name) {
    const uniform = material._uniforms[name]
    if (!uniform) throws(`The uniform \"${name}\" does not exist on the queried material of type ${material.type}.`)
    return uniform.value
  }
}