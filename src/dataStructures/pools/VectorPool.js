import {Pool} from "./objectPool.js"
import { Vector2} from "../math/index.js"

/**
 * A vector pool.
*/
export class VectorPool extends Pool{
  /**
   * @inheritdoc
   * 
   * @returns Vector2
  */
  create(){
    return new Vector2()
  }
  /**
   * 
  */
  destroy(v){
    v.x = 0
    v.y = 0
    
    return v
  }
}