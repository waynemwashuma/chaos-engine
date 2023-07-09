import { Behaviour } from "./behaviour.js"
import { Vector } from "../../math/index.js"


/**
 * not complete.
 * 
 * @augments Behaviour
 */
class Flock {
  /**
   * @type Agent[]
   */
  neighbours = []
  constructor() {}
  /**
   * @inheritdoc
   * @param {Agent} agent
   * 
   */
  init(agent) {

  }
  /**
   * @inheritdoc
   * @param {Vector} target
   * @param {number} inv_dt
   * @returns Vector the first parameter
   */
  calc(target,inv_dt) {

  }
}

export {
  Flock
}