import { Behaviour } from "./behaviour.js"
import { Vector2 } from "../../math/index.js"


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
     * @param { Vector2} target
     * @param {number} inv_dt
     * @returns Vector2 the first parameter
     */
  calc(target){
    
  }
}

export {
  Pursuit
}