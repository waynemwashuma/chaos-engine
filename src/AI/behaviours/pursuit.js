import { Behaviour } from "./behaviour.js"
import { Vector } from "../../math/index.js"


/**
 * Not impemented.
 * 
 * @augments Behaviour
*/
class Pursuit extends Behaviour {
  constructor() {
    super()
  }
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
  init(){
    
  }
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
  calc(target){
    
  }
}

export {
  Pursuit
}