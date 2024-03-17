import { Material } from "./material.js"
import { MaterialType } from "./types.js"
/**
 * 
 * @implements {Material}
*/
export class BasicMaterial {
  type = MaterialType.BASIC
  /**
   * 
   * @type {string}
   * @default "white"
   */
  fill = "white"
  /**
   * 
   * @type {string}
   * @default "black"
   */
  stroke = "black"
  /**
   * 
   * @type {Boolean}
   * @default false
   */
  wireframe = false
}