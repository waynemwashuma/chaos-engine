import { Behaviour } from "./behaviour.js"
import { Vector2 } from "../../math/index.js"

let tmp1 = new Vector2()
  
/**
 * Creates a behaviour to seek out a target and move towards it.
 * 
 * @augments Behaviour
*/
export class SeekBehaviour extends Behaviour {
  /**
   * Not implemented.
   * Radius in which to seek out the target.
   * 
   * @type {number}
  */
  radius = 100
  /**
   * @type {Vector2}
  */
  target = null
  /**
   * @param { Vector2} target
  */
  constructor(target) {
    super()
    this.target = target
  }
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
  init(agent) {
    this.position = agent.position
    this.velocity = agent.velocity
  }
    /**
     * @inheritdoc
     * @param { Vector2} target
     * @param {number} inv_dt
     * @returns Vector2 the first parameter
     */
  calc(target,inv_dt) {
    let difference = tmp1.copy(this.target).sub(this.position)
    difference.setMagnitude(this.maxSpeed)
    let steering = difference.sub(this.velocity).multiply(inv_dt)
    
    steering.clamp(0, this.maxForce)
    target.copy(steering)
  }
}