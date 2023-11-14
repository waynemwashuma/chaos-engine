import { Behaviour } from "./behaviour.js"
import { Vector2 } from "../../math/index.js"


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
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target,inv_dt) {

  }
}

export {
  Flock
}