import {Pool} from "./objectPool.js"
import { Vector2} from "../../math/index.js"

/**
 * A vector pool.
 * @extends Pool<Vector2>
*/
export class VectorPool extends Pool{
  /**
   * @param {number} num
   */
  constructor(num){
    super(num,()=>new Vector2())
  }
}