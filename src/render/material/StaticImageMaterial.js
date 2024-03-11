import { MaterialType } from "./types.js"
import { Material } from "././material.js"

 /**
 * 
 * @implements Material
 */
export class StaticImageMaterial{
  type = MaterialType.STATICIMAGE
  /**
   * @readonly
   * @type {Image}
   */
  image = null
  /**
   * 
   * @type {number}
   */
  width = 100
  /**
   * 
   * @type {number}
   */
  height = 100
  /**
   * @type {Vector_like}
   */
  offset = {
    x: 0,
    y: 0
  }
  /**
   * @param {Image} img
   */

  constructor(img, width = 100, height = 100) {
    this.image = img
    this.width = width
    this.height = height
    this.offset.x = -width/2
    this.offset.y = -height/2
  }
}