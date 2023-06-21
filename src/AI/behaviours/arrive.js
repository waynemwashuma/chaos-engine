import { Behaviour } from "./behaviour.js"
import { Vector, map, clamp } from "../../utils/index.js"

import {ctx} from "/src/debug.js"

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
    this.target = pursued
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
   * @param {} target
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
    this.target.draw(ctx)
    target.add(steering)
  }
}

export {
  ArriveBehaviour
}