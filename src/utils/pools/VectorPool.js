import {Pool} from "./objectPool.js"
import {Vector} from "../math/index.js"

/**
 * A vector pool.
*/
class VectorPool extends Pool{
  /**
   * @inheritdoc
   * 
   * @returns Vector
  */
  create(){
    return new Vector()
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