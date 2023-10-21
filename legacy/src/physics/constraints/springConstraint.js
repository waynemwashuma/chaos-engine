import { Constraint } from "./constraint.js";
import {Vector} from"../../utils/vector.js"

class SpringConstraint extends Constraint {
  constructor(body1, body2, offset) {
    super(body1, body2)
    this.offset = new Vector().copy(offset)
    this.maxDistance = 0
    this.distance = 0
  }
  behavior(body1, body2, gravity) {
    let offset = this.offset.clone().rotate(body1.rad)
    let pos = body1.position.clone().add(offset)
    let dist = pos.clone().sub(body2.position)

    let collisionArm1 = pos.clone().sub(body1.position)
    let collisionArm2 = pos.clone().sub(body2.position)

    let diff = dist.clone().divide(body1.inv_mass + body2.inv_mass)

    let vel1 = diff.clone().multiply(-body1.inv_mass * this.stiffness).sub(body1.velocity.clone().multiply(this.dampening))
    let vel2 = diff.multiply(this.stiffness * body2.inv_mass).sub(body2.velocity.clone().multiply(this.dampening))

    body1.velocity.add(vel1)
    body2.velocity.add(vel2)

    body1.velocity//.multiply(1 - this.dampening)
    body2.velocity//.multiply(1 - this.dampening)

    body1.angularVelocity -= vel1.cross(collisionArm1)* body1.inv_inertia + body1.angularVelocity * this.dampening
    body2.angularVelocity += vel2.cross(collisionArm2) * body2.inv_inertia - body2.angularVelocity *this.dampening

    body1.velocity.add(gravity)
    body2.velocity.add(gravity)

    this.distance = dist
    //pos.draw(renderer.ctx)
  }
}
export{
  SpringConstraint
}