import { Behaviour } from "./behaviour.js"
import { Vector, rand } from "../../utils/index.js"
//import { ctx } from "/src/debug.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()
class WanderBehaviour extends Behaviour {
  maxSpeed = 200
  maxForce = 100
  _theta = 90
  dtheta = 10
  _radius = 100
  constructor() {
    super()
  }
  init(agent) {
    this.position = agent.position
    this.velocity = agent.velocity
  }
  calc(target, inv_dt) {
    
    this._theta += rand(-this.dtheta,+this.dtheta)
    let forward = tmp1.copy(this.velocity)
    if (forward.equalsZero())
      Vector.random(forward)
    let radius = this._radius * 0.8
    forward.setMagnitude(this._radius)
    //ctx.arc(...tmp2.copy(this.position).add(forward), radius, 0, Math.PI * 2)
    //ctx.stroke()
    Vector.fromDeg(this._theta + Vector.toDeg(this.velocity),tmp2).multiply(radius)
    forward.add(tmp2)
    //forward.draw(ctx,...this.position)
    forward.setMagnitude(this.maxSpeed)
    forward.sub(this.velocity).multiply(inv_dt).clamp(0,this.maxForce)
    target.copy(forward)
  }

}

export {
  WanderBehaviour
}