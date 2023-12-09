import { Vector2, sq }from "../../math/index.js"
import { Settings } from "../settings.js"
const tmp1 = new Vector2(),
  tmp2 = new Vector2()
let dampen = Settings.posDampen

/**
 * Solves the interpenetration of bodies.
*/
export const PenetrationSolver = {
  solve(manifold, inv_dt) {
    let { bodyA, bodyB, ca1, ca2 } = manifold
    let { axis, overlap } = manifold.contactData

    const dampened = overlap * dampen
    const a = dampened / (bodyA.inv_mass + bodyB.inv_mass + sq(ca1.cross(axis)) * bodyA.inv_inertia + sq(ca2.cross(axis)) * bodyB.inv_inertia)
    let jp = tmp2.copy(axis).multiply(a)
    bodyA.velocity.add(tmp1.copy(jp).multiply(bodyA.inv_mass * inv_dt))
    bodyB.velocity.add(tmp1.copy(jp).multiply(-bodyB.inv_mass * inv_dt))
    bodyA.rotation.value += ca1.cross(jp) * bodyA.inv_inertia * inv_dt
    bodyB.rotation.value += ca2.cross(jp) * -bodyB.inv_inertia * inv_dt
    manifold.contactData.lastOverlap = overlap
  }
}