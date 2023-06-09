import { Behaviour } from "./behaviour.js"
import { Vector, map, clamp } from "../../utils/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()
  
/**
 * Not complete.
*/
class ArriveBehaviour extends Behaviour {
  maxSpeed = 1000
  maxForce = 2000
  arrive = false
  arrivespeed = 1
  radius = 1000
  constructor(pursued) {
    super()
    let transform = pursued.get("transform")
    let move = pursued.get("movable")
    //TODO - Check if the above are undefined
    this.pursuedPos = transform.position
    this.pursuedVel = move.velocity
    this.pursuedRot = move.rotation
    this.pursuedOrt = transform.orientation
  }

  /**
   * @inheritdoc
   * @param {Agent} agent
   */
  init(agent) {
    this.pursuerPos = agent.position
    this.pursuerVel = agent.velocity
    this.pursuerRot = agent.rotation
    this.pursuerOrt = agent.orientation
  }
  /**
   * @inheritdoc
   * @param {} target
   */
  calc(target, inv_dt) {
    let difference = tmp1.copy(this.pursuedPos).sub(this.pursuerPos)
    let velocity = tmp2.copy(this.pursuerVel)
    let length = difference.magnitude()

    if (length < this.radius) {
      difference.setMagnitude(map(length, 0, this.radius, 0, this.maxSpeed))
    } else {
      difference.setMagnitude(this.maxSpeed)
    }

    let steering = difference.sub(velocity).multiply(inv_dt)

    steering.clamp(0, this.maxForce)
    steering.draw(ctx, ...this.pursuerPos)
    target.copy(steering)
  }
}

export {
  ArriveBehaviour
}