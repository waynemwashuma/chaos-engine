import {Pool} from "./objectPool.js"
import { Vec2} from "../math/index.js"

/**
 * A vector pool.
*/
export class VectorPool extends Pool{
  /**
   * @inheritdoc
   * 
   * @returns Vec2
  */
  create(){
    return new Vec2()
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