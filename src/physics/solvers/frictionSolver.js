import { Vector, sq } from "../../utils/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector(),
  tmp3 = new Vector(),
  tmp4 = new Vector(),
  tmp5 = new Vector()
class FrictionSolver {
  static solve(manifold) {
    let { bodyA: a, bodyB: b, ca1, ca2, restitution, impulse } = manifold
    let { axis } = manifold.contactData
    if (impulse <= 0) return
    let a$va = tmp1.set(ca1.y * -a.rotation._rad, ca1.x * a.rotation._rad)
    let a$vb = tmp2.set(ca2.y * -b.rotation._rad, ca2.x * b.rotation._rad)
    let va = tmp3.copy(a.velocity).add(a$va)
    let vb = tmp4.copy(b.velocity).add(a$vb)
    let relVel = va.sub(vb)
    if (relVel.magnitudeSquared() === 0)
      return
    let tangent = axis.normal(1, tmp4)
    tangent = tangent.multiply(tangent.dot(relVel))
    if (tangent.magnitudeSquared() === 0) return
    tangent.normalize()

    let relV = tangent.dot(relVel)

    let sf = Math.min(a.staticFriction, b.staticFriction)
    let kf = Math.min(a.kineticFriction, b.kineticFriction)
    let j = -relV / (
      (a.inv_mass + b.inv_mass) +
      sq((ca1.dot(tangent)) * a.inv_inertia + sq(ca2.dot(tangent)) * b.inv_inertia)
    )
    let jt
    if (Math.abs(j) >= impulse * sf) {
      jt = tangent.multiply(-impulse * kf)
    } else {
      jt = tangent.multiply(j)
    }

    manifold.velA.add(tmp5.copy(jt).multiply(a.inv_mass))
    manifold.velB.add(tmp5.copy(jt).multiply(-b.inv_mass))
    manifold.rotA += ca1.cross(jt) * a.inv_inertia
    manifold.rotB += ca2.cross(jt) * -b.inv_inertia
  }
}

export {
  FrictionSolver
}