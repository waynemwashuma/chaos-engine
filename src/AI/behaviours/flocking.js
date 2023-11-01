import { Behaviour } from "./behaviour.js"
import { Vec2 } from "../../math/index.js"


/**
 * not complete.
 * 
 * @augments Behaviour
 */
class Flock extends Behaviour{
  /**
   * @type Agent[]
   */
  neighbours = []
  constructor() {
    super()
  }
  /**
   * @inheritdoc
   * @param {Agent} agent
   * 
   */
  init(agent) {

  }
  /**
   * @inheritdoc
   * @param { Vec2} target
   * @param {number} inv_dt
   * @returns Vec2 the first parameter
   */
  calc(target,inv_dt) {

  }
}

export {
  Flock
}