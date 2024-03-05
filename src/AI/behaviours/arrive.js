import { Behaviour } from "./behaviour.js"
import { Vector2, map } from "../../math/index.js"

let tmp1 = new Vector2(),
  tmp2 = new Vector2()

/**
 * This provides a seek behaviour which slows down when the agent approaches a target.
 * 
 * @augments Behaviour
 */
export class ArriveBehaviour extends Behaviour {
  /**
   * Radius in which to expect the agent to start slowing down.
   * 
   * @type number
   */
  radius = 1000
  /**
   * @param { Vector2} target
   */
  constructor(target) {
    super()
    this.target = target
  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(position,velocity,target, inv_dt) {
    const difference = tmp1.copy(this.target).sub(position)
    //const velocity = tmp2.copy(velocity1)
    const length = difference.magnitude()

    if (length < this.radius) {
      difference.setMagnitude(map(length, 0, this.radius, 0, this.maxSpeed))
    } else {
      difference.setMagnitude(this.maxSpeed)
    }

    const steering = difference.sub(velocity).multiply(inv_dt)

    steering.clamp(0, this.maxForce)
    target.add(steering)
  }
}