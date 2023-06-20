import { Behaviour } from "./behaviour.js"
import { Vector, map, clamp } from "../../utils/index.js"
//import { ctx } from "/src/debug.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()
class SeekBehaviour extends Behaviour {
  maxSpeed = 1000
  maxForce = 2000
  arrive = false
  arrivespeed = 1
  radius = 100
  constructor(target) {
    super()
    this.target = target
  }
  init(agent) {
    this.position = agent.position
    this.velocity = agent.velocity
  }
  calc(target,inv_dt) {
    let difference = tmp1.copy(this.target).sub(this.position)
    difference.setMagnitude(this.maxSpeed)
    let steering = difference.sub(this.velocity).multiply(inv_dt)
    
    steering.clamp(0, this.maxForce)
    target.copy(steering)
  }
}

export {
  SeekBehaviour
}