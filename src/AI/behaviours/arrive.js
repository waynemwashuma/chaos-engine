import { Behaviour } from "./behaviour.js"
import { Vector, map, clamp } from "../../math/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()

/**
 * This provides a seek behaviour which slows down when the agent approaches a target.
 * 
 * @augments Behaviour
 */
class ArriveBehaviour extends Behaviour {
  /**
   * Radius in which to expect the agent to start slowing down.
   */
  radius = 1000
  /**
   * @param {Vector} target
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
   * @param {Vector} target
   * @returns Vector the first parameter
   */
  calc(target, inv_dt) {
    let difference = tmp1.copy(this.target).sub(this.position)
    let velocity = tmp2.copy(this.velocity)
    let length = difference.magnitude()

    if (length < this.radius) {
      difference.setMagnitude(map(length, 0, this.radius, 0, this.maxSpeed))
    } else {
      difference.setMagnitude(this.maxSpeed)
    }

    let steering = difference.sub(velocity).multiply(inv_dt)

    steering.clamp(0, this.maxForce)
    steering.draw(ctx, ...this.position)
    target.add(steering)
  }
}

export {
  ArriveBehaviour
}