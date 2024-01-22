import { Constraint } from "./constraint.js";
import { Vector2 } from "../../math/index.js"

let tmp1 = new Vector2(),
  tmp2 = new Vector2(),
  tmp3 = new Vector2(),
  tmp4 = new Vector2(),
  tmp5 = new Vector2()

/**
 * This constraint is stronger than a spring in the sense that it will not oscilate as such as a spring constraint.
 */
export class DistanceConstraint extends Constraint {
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    super(body1, body2,localA,localB)
    this.fixed = !body1.mass || !body2.mass
    this.dampening = 1
    this.maxDistance = 1
    this.stiffness = 1
  }
  /**
   * @inheritdoc
   * 
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {number} dt
  */
  behavior(body1, body2,dt) {
    let arm1 = tmp1.copy(this.localA),
      arm2 = tmp2.copy(this.localB),
      pos1 = tmp3.copy(body1.position).add(arm1),
      pos2 = tmp4.copy(body2.position).add(arm2),
      dist = pos1.sub(pos2),
      magnitude = dist.magnitude()

    if (magnitude === 0) {
      return
    }
    let difference = (magnitude - this.maxDistance) / magnitude,
      force = dist.multiply(difference * this.stiffness * this.dampening),
      massTotal = body1.inv_mass + body2.inv_mass
      //inertiaTotal = body1.inv_inertia + body2.inv_inertia
    tmp4.copy(force)
    force.divide(massTotal * 2)

    body1.velocity.add(tmp5.copy(force).multiply(-body1.inv_mass).divide(dt))
    body2.velocity.add(tmp5.copy(force).multiply(body2.inv_mass).divide(dt))

    body1.position.add(tmp5.copy(force).multiply(-body1.inv_mass))
    body2.position.add(tmp5.copy(force).multiply(body2.inv_mass))

    body1.rotation.value += tmp4.cross(arm1) * body1.inv_inertia
    body2.rotation.value += tmp4.cross(arm2) * -body2.inv_inertia
  }
}