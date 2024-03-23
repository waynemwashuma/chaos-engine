import { Material } from "./material.js"
import { MaterialType } from "./types.js"
import { deprecate, throws } from "../../logger/index.js"

/**
 * 
 * @implements {Material}
 */
export class SpriteMaterial extends Material {
  type = MaterialType.SPRITE
  /**
   * @param {HTMLImageElement} img Image to draw
   * @param {number} [frames] Number of cutouts in the sprite in the X axis of the image.
   * @param {number} [actions] Number of cutouts in the sprite in the Y axis of the image.
   */
  constructor(opts = {}) {
    if (!opts.uniforms) opts.uniforms = {}
    opts.uniforms.image = opts.image ?? new Image()
    opts.uniforms.width = opts.width ?? 100
    opts.uniforms.height = opts.height ?? 100
    opts.uniforms.frameRate = opts.frameRate ?? 1 / 60
    super(opts)
    SpriteMaterial.setup(
      this,
      opts.uniforms.image.width,
      opts.uniforms.image.height,
      opts.frames,
      opts.actions,
    )
    console.log(this)
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get width() {
    deprecate("SpriteMaterial().width")
    return this._uniforms["width"].value
  }
  set width(x) {
    deprecate("SpriteMaterial().width")
    this._uniforms["width"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get height() {
    deprecate("SpriteMaterial().height")
    return this._uniforms["height"].value
  }
  set width(x) {
    deprecate("SpriteMaterial().width")
    this._uniforms["width"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 1/60
   */
  get frameRate() {
    deprecate("SpriteMaterial().frameRate")
    return this._uniforms["frameRate"].value
  }
  set frameRate(x) {
    deprecate("SpriteMaterial().frameRate")
    this._uniforms["frameRate"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get frameWidth() {
    deprecate("SpriteMaterial().frameWidth")
    return this._uniforms["frameWidth"].value
  }
  set frameWidth(x) {
    deprecate("SpriteMaterial().frameWidth")
    this._uniforms["frameWidth"] = x
  }
  /**
   * 
   * @deprecated
   * @type {String}
   * @default 100
   */
  get frameHeight() {
    deprecate("SpriteMaterial().frameHeight")
    return this._uniforms["frameHeight"].value
  }
  set frameHeight(x) {
    deprecate("SpriteMaterial().frameHeight")
    this._uniforms["frameHeight"] = x
  }
  /**
   * @deprecated
   */
  setup() {
    deprecate("SpriteMaterial().setup()")
    throws("Breaking deprecation encountered")
  }

  /**
   * Sets max number of frames for a given action
   * 
   * @deprecated
   * @param {number} action 
   * @param {number} max
   */
  setMaxFrames(action, max) {
    deprecate("SpriteMaterial().setMaxFrames()", 'SpriteMaterial.setMaxFrames()')
    SpriteMaterial.setMaxFrames(this, action, max)
  }

  /**
   * Sets a given action to be rendered
   * 
   * @deprecated
   * @param {number} index
   */
  setAction(index) {
    deprecate("SpriteMaterial().setAction()", 'SpriteMaterial.setAction()')
    SpriteMaterial.setAction(this, index)
  }
  static setMaxFrames(material, action, max) {
    Material.getUniform(material, "maxFrames")[action] = max
  }
  /**
   * 
   * @param {number} frames
   * @param {number} actions
   */
  static setup(material, width, height, frames, actions) {
    const maxFrames = []
    const frameWidth = width / (frames || 1)
    const frameHeight = height / actions

    for (let i = 0; i < actions; i++) {
      maxFrames.push(frames)
    }

    Material.setUniform(material, "maxFrame", frames - 1)
    Material.setUniform(material, "frameWidth", frameWidth)
    Material.setUniform(material, "frameHeight", frameHeight)
    Material.setUniform(material, "maxFrames", maxFrames)
    Material.setUniform(material, "_frame", 0)
    Material.setUniform(material, "_index", 0)
    Material.setUniform(material, "_accumulator", 0)
  }
  /**
   * Sets a given action to be rendered
   * 
   * @param {number} action
   */
  static setAction(material, action) {
    Material.setUniform(material, "_index", action)
    Material.setUniform(material, "_frame", 0)
  }
}