import { Vector2, sq } from "../../math/index.js"
import { Settings } from "../settings.js"
const tmp1 = new Vector2(),
  tmp2 = new Vector2()
const dampen = Settings.posDampen
const slop = 0.01

/**
 * Solves the interpenetration of bodies.
 */
export class PenetrationSolver {
  static solve(movableA, movableB, bodyA, bodyB, manifold, inv_dt) {
    const { ca1, ca2 } = manifold
    const { axis, overlap } = manifold.contactData

    const dampened = Math.max(overlap - slop,0) * dampen
    const a = dampened / (bodyA.inv_mass + bodyB.inv_mass + sq(ca1.cross(axis)) * bodyA.inv_inertia + sq(ca2.cross(axis)) * bodyB.inv_inertia)
    let jp = tmp2.copy(axis).multiply(a)
    movableA.velocity.add(tmp1.copy(jp).multiply(bodyA.inv_mass * inv_dt))
    movableB.velocity.add(tmp1.copy(jp).multiply(-bodyB.inv_mass * inv_dt))
    movableA.rotation += ca1.cross(jp) * bodyA.inv_inertia * inv_dt
    movableB.rotation += ca2.cross(jp) * -bodyB.inv_inertia * inv_dt
    manifold.contactData.lastOverlap = overlap
  }
  static solveT(movableA, movableB, bodyA, bodyB, manifold) {
    let { ca1, ca2 } = manifold
    let { axis, overlap } = manifold.contactData

    const dampened = overlap * dampen
    const a = dampened / (bodyA.inv_mass + bodyB.inv_mass)// + sq(ca1.cross(axis)) * bodyA.inv_inertia + sq(ca2.cross(axis)) * bodyB.inv_inertia)
    let jp = tmp2.copy(axis).multiply(a)
    movableA.position.add(tmp1.copy(jp).multiply(bodyA.inv_mass))
    movableB.position.add(tmp1.copy(jp).multiply(-bodyB.inv_mass))
    //movableA.orientation += ca1.cross(jp) * bodyA.inv_inertia
    //movableB.orientation += ca2.cross(jp) * -bodyB.inv_inertia 
    manifold.contactData.lastOverlap = overlap
  }
}