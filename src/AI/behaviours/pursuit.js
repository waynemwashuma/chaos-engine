import { Behaviour } from "./behaviour.js"
import { Vector2 } from "../../math/index.js"


/**
 * Not impemented.
 * 
 * @augments Behaviour
*/
export class Pursuit extends Behaviour {
  constructor() {
    super()
  }
  /**
   * @inheritdoc
   * @param {Agent} agent
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