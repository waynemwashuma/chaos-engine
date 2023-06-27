import {Behaviour} from "./behaviour.js"
import { Vector } from "../../math/index.js"


/**
 * not complete.
 * 
 * @augments Behaviour
*/
class Flock{
  constructor(){
    this.neighbours = []
  }
    /**
     * @inheritdoc
     * @param {Agent} agent
     * 
     */
  init(){
    
  }
    /**
     * @inheritdoc
     * @param {Vector} target
     * @returns Vector the first parameter
     */
  calc(target){
    
  }
}

export{
  Flock
}