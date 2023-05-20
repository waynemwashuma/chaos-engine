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
  constructor(pursuer) {
    super()
    let transform = pursuer.get("transform")
    let move = pursuer.get("movable")
    //TODO - Check if the above are undefined
    this.pursuedPos = transform.position
    this.pursuedVel = move.velocity
    this.pursuedRot = move.rotation
    this.pursuedOrt = transform.orientation
  }
  init(agent) {
    this.pursuerPos = agent.position
    this.pursuerVel = agent.velocity
    this.pursuerRot = agent.rotation
    this.pursuerOrt = agent.orientation
  }
  calc(target,inv_dt) {
    let difference = tmp1.copy(this.pursuedPos).sub(this.pursuerPos)
    let velocity = tmp2.copy(this.pursuerVel)
    difference.setMagnitude(this.maxSpeed)
    let steering = difference.sub(velocity).multiply(inv_dt)
    
    steering.clamp(0, this.maxForce)
    target.copy(steering)
  }
}

export {
  SeekBehaviour
}