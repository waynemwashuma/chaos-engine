import { Behaviour } from "./behaviour.js"
import { Vector,clamp,map } from "../../utils/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()
class EvadeBehaviour extends Behaviour {
  maxSpeed = 1200
  maxForce = 2000
  arrive = false
  arrivespeed = 1
  radius = 200
  constructor(pursuer) {
    super()
    this.pursuer = pursuer
  }
  init(agent) {
    this.position = agent.position
    this.velocity = agent.velocity
    
  }
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