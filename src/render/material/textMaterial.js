import { Material } from "././material.js"
import { MaterialType } from "./types.js"

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
  color = "white"
  /**
   * @type {boolean}
   */
  fill = true
  /**
   * @type {String}
   */
  font = "16px sans-serif"
  /**
   * @param {String} text
   */
  constructor(text) {
    super()
    this.text = text
  }
}