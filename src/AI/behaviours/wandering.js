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
   * @type number
   */
  _theta = 90
  /**
   * This clamps the offset that modify the WandererBehaviour#theta value each frame.
   * 
  * @type number
  */
  dtheta = 10
  /**
   * How big should the circle in front of the agent be.
  */
  _radius = 100
  constructor() {
    super()
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
  calc(target, inv_dt) {

    this._theta += rand(-this.dtheta, +this.dtheta)
    let forward = tmp1.copy(this.velocity)
    if (forward.equalsZero())
      Vector2.random(forward)
    let radius = this._radius * 0.8
    forward.setMagnitude(this._radius)
    //ctx.arc(...tmp2.copy(this.position).add(forward), radius, 0, Math.PI * 2)
    //ctx.stroke()
    Vector2.fromDeg(this._theta + Vector2.toDeg(this.velocity), tmp2).multiply(radius)
    forward.add(tmp2)
    //forward.draw(ctx,...this.position)
    forward.setMagnitude(this.maxSpeed)
    forward.sub(this.velocity).multiply(inv_dt).clamp(0, this.maxForce)
    target.copy(forward)
  }

}