import { Behaviour } from "./behaviour.js"
import { Vector,clamp,map } from "../../utils/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()
class EvadeBehaviour extends Behaviour {
  maxSpeed = 800
  maxForce = 2000
  arrive = false
  arrivespeed = 1
  radius = 100
  constructor(pursuer) {
    super()
    let transform = pursuer.get("transform")
    let move = pursuer.get("movable")
    //TODO - Check if the above are undefined
    this.pursuerPos = transform.position
    this.pursuerVel = move.velocity
    this.pursuerRot = move.rotation
    this.pursuerOrt = transform.orientation
  }
  init(agent) {
    this.pursuedPos = agent.position
    this.pursuedVel = agent.velocity
    this.pursuedPosRot = agent.rotation
    this.pursuedOrt = agent.orientation
  }
  calc(target,inv_dt) {
    let difference = tmp1.copy(this.pursuedPos).sub(this.pursuerPos)
    let velocity = tmp2.copy(this.pursuedVel)
    let length = difference.magnitude()
    if(length == 0 || length> this.radius)return
    difference.setMagnitude(map(length,0,this.radius,this.maxSpeed,0))
    let steering = difference.sub(velocity).multiply(inv_dt)
    
    steering.clamp(0, this.maxForce)
    target.copy(steering)
  }
}

export{
  EvadeBehaviour
}