import { Vector2, sq }from "../../math/index.js"

let tmp1 = new Vector2(),
  tmp2 = new Vector2(),
  tmp3 = new Vector2(),
  tmp4 = new Vector2(),
  tmp5 = new Vector2()

/**
 * Solves for impulse along collision tangent for a given body pair.
*/
export const FrictionSolver = {
  /***/
  solve(movableA,movableB,bodyA,bodyB,manifold) {
    let { ca1, ca2, impulse } = manifold
    let { axis } = manifold.contactData
    if (impulse <= 0) return
    let a$va = tmp1.set(ca1.y * -movableA.rotation, ca1.x * movableA.rotation)
    const a$vb = tmp2.set(ca2.y * -movableB.rotation, ca2.x * movableB.rotation)
    const va = tmp3.copy(movableA.velocity).add(a$va)
    const vb = tmp4.copy(movableB.velocity).add(a$vb)
    const relVel = va.sub(vb)
    if (relVel.magnitudeSquared() === 0)
      return
    const tangent = axis.normal(1,tmp4)
    tangent = tangent.multiply(tangent.dot(relVel))
    if (tangent.magnitudeSquared() === 0) return
    tangent.normalize()

    let relV = tangent.dot(relVel)

    let sf = Math.min(bodyA.staticFriction, bodyB.staticFriction)
    let kf = Math.min(bodyA.kineticFriction, bodyB.kineticFriction)
    let j = -relV / (
      (bodyA.inv_mass + bodyB.inv_mass) +
      sq((ca1.dot(tangent)) * bodyA.inv_inertia + sq(ca2.dot(tangent)) * bodyB.inv_inertia)
    )

    let jt
    if (Math.abs(j) <= impulse * sf) {
      jt = tangent.multiply(j)

    } else {
      jt = tangent.multiply(j * kf)
    }

    manifold.velA.add(tmp5.copy(jt).multiply(bodyA.inv_mass))
    manifold.velB.add(tmp5.copy(jt).multiply(-bodyB.inv_mass))
    manifold.rotA += ca1.cross(jt) * bodyA.inv_inertia
    manifold.rotB += ca2.cross(jt) * -bodyB.inv_inertia
  }
}