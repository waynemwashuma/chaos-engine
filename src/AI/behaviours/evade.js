import { Behaviour } from "./behaviour.js"
import { Vector2,map } from "../../math/index.js"

let tmp1 = new Vector2()
/**
 * Creates a behaviour to evade a certain position.
 * 
 * @augments Behaviour
*/
class EvadeBehaviour extends Behaviour {
  /**
   * Distance in which to begin evading.
   * 
   * @type number
  */
  radius = 200
  /**
   * @param { Vector2} pursuer
  */
  constructor(pursuer) {
    super()
    this.pursuer = pursuer
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
    let difference = tmp1.copy(this.position).sub(this.pursuer)
    let length = difference.magnitude()
    if(length == 0 || length > this.radius)return
    difference.setMagnitude(map(length,0,this.radius,this.maxSpeed,0))
    let steering = difference.sub(this.velocity).multiply(inv_dt)
    
    steering.clamp(0, this.maxForce)
    target.copy(steering)
  }
}

export{
  EvadeBehaviour
}