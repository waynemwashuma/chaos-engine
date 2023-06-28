import { Constraint } from "./constraint.js";
import { Vector } from "../../math/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector(),
  tmp3 = new Vector(),
  tmp4 = new Vector(),
  tmp5 = new Vector(),
  zero = new Vector()

/**
 * This constraint is stronger than a spring in the sense that it will not oscilate as such as a spring constraint.
 */
class DistanceConstraint extends Constraint {
  /**
   * @param {Body} body1
   * @param {Body} body2
   * @param {Vector} localA
   * @param {Vector} localB
   */
  constructor(body1, body2, localA, localB) {
    super(body1, body2)
    this.localA = new Vector().copy(localA || zero)
    this.localB = new Vector().copy(localB || zero)
    this.fixed = !body1.mass || !body2.mass
    this.dampen = 1
    this.maxDistance = 1
    this.stiffness = 1
  }
  /**
   * @ignore
  */
  behavior(body1, body2, dt) {
    let arm1 = tmp1.copy(this.localA).rotate(body1.angle * Math.PI / 180),
      arm2 = tmp2.copy(this.localB).rotate(body2.angle * Math.PI / 180),
      pos1 = tmp3.copy(body1.position).add(arm1),
      pos2 = tmp4.copy(body2.position).add(arm2),
      dist = pos1.sub(pos2),
      magnitude = dist.magnitude()

    if (magnitude === 0) {
      return
    }
    let difference = (magnitude - this.maxDistance) / magnitude,
      force = dist.multiply(difference * this.stiffness * this.dampen),
      massTotal = body1.inv_mass + body2.inv_mass,
      inertiaTotal = body1.inv_inertia + body2.inv_inertia
    tmp4.copy(force)
    force.divide(massTotal * 2)

    body1.velocity.add(tmp5.copy(force).multiply(-body1.inv_mass).divide(dt))
    body2.velocity.add(tmp5.copy(force).multiply(body2.inv_mass).divide(dt))

    body1.position.add(tmp5.copy(force).multiply(-body1.inv_mass))
    body2.position.add(tmp5.copy(force).multiply(body2.inv_mass))

    body1.rotation.radian += tmp4.cross(arm1) * body1.inv_inertia
    body2.rotation.radian += tmp4.cross(arm2) * -body2.inv_inertia
  }
}
export {
  DistanceConstraint
}