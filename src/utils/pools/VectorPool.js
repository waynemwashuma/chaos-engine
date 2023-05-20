import {Pool} from "./objectPool.js"
import {Vector} from "../math/index.js"
class VectorPool extends Pool{
  constructor(){
    super(...arguments)
  }
  create(){
    return new Vector()
  }
  destroy(v){
    v.x = 0
    v.y = 0
    
    return v
  }
}