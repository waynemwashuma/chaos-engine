import { Vector, sq } from "../../utils/index.js"
import { Settings } from "../settings.js"
const tmp1 = new Vector(),
  tmp2 = new Vector()
let dampen = Settings.posDampen
export const PenetrationSolver = {
  warmstart(manifold, laststmp) {
    if (manifold.stmp !== laststmp) return
    let dd = manifold.contactData.lastOverlap - manifold.contactData.overlap
    manifold.contactData.overlap -= dd * 0.2
  },
  solve(manifold, inv_dt) {
    let { bodyA, bodyB, ca1, ca2 } = manifold
    let { axis, overlap } = manifold.contactData

    const dampened = overlap * dampen
    const a = dampened / (bodyA.inv_mass + bodyB.inv_mass + sq(ca1.cross(axis)) * bodyA.inv_inertia + sq(ca2.cross(axis)) * bodyB.inv_inertia)
    let jp = tmp2.copy(axis).multiply(a)
    bodyA.velocity.add(tmp1.copy(jp).multiply(bodyA.inv_mass * inv_dt))
    bodyB.velocity.add(tmp1.copy(jp).multiply(-bodyB.inv_mass * inv_dt))
    bodyA.rotation.radian += ca1.cross(jp) * bodyA.inv_inertia * inv_dt
    bodyB.rotation.radian += ca2.cross(jp) * -bodyB.inv_inertia * inv_dt
    manifold.contactData.lastOverlap = overlap
  }
}