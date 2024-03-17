import { Behaviour } from "./behaviour.js"
import { Vector2, rand } from "../../math/index.js"

let tmp1 = new Vector2(),
  tmp2 = new Vector2()
  
/**
 * Creates a behaviour that is used to make an agent wander in an organic manner.
 * 
 * @augments Behaviour
*/
export class WanderBehaviour extends Behaviour {
  /**
   * This sets a point on the perimeter circle that is infront of the agent.
   * 
   * @type {number}
   */
  _theta = Math.PI
  /**
   * This clamps the offset that modify the WandererBehaviour#theta value each frame.
   * 
  * @type {number}
  */
  dtheta = Math.PI/18
  /**
   * How big should the circle in front of the agent be.
  */
  _radius = 100
  constructor() {
    super()
  }
  /**
   * @inheritdoc
   * @param {Vector2} velocity
   * @param {Vector2} target
   * @param {number} inv_dt
   * @returns {Vector2} the first parameter
   */
  calc(velocity,target, inv_dt) {

    this._theta += rand(-this.dtheta, +this.dtheta)
    let forward = tmp1.copy(velocity)
    if (forward.equalsZero())
      Vector2.random(forward)
    let radius = this._radius * 0.8
    forward.setMagnitude(this._radius)
    Vector2.fromAngle(this._theta + Vector2.toAngle(velocity), tmp2).multiply(radius)
    forward.add(tmp2) 
    forward.setMagnitude(this.maxSpeed)
    forward.sub(velocity).multiply(inv_dt).clamp(0, this.maxForce)
    return target.copy(forward)
  }

}