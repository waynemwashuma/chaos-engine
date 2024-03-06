import { Vector2, sq } from "../../math/index.js"
let tmp1 = new Vector2(),
  tmp2 = new Vector2(),
  tmp3 = new Vector2(),
  tmp4 = new Vector2()

/**
 * Solves for the collision normal impulse of a given body pair.
 */
export class ImpulseSolver {
  static solveWithFriction(movableA, movableB, bodyA, bodyB, manifold) {
    manifold.impulse = 0
    
    const sf = manifold.staticFriction
    const kf = manifold.kineticFriction
    const { ca1, ca2, restitution } = manifold
    
    const { axis: normal } = manifold.contactData
    const a$va = new Vector2().set(ca1.y * -movableA.rotation, ca1.x * movableA.rotation)
    const a$vb = new Vector2().set(ca2.y * -movableB.rotation, ca2.x * movableB.rotation)
    const va = a$va.add(movableA.velocity)
    const vb = a$vb.add(movableB.velocity)
    const relVel = va.sub(vb)
    
    const tangent = normal.normal(1)
    tangent.multiply(tangent.dot(relVel))
    tangent.normalize()
    
    const vp_n = normal.dot(relVel);
    const vp_t = tangent.dot(relVel)

    if (vp_n >= 0) return

    const j = -(1 + restitution) * vp_n / (
      (bodyA.inv_mass + bodyB.inv_mass) +
      sq(ca1.cross(normal)) * bodyA.inv_inertia +
      sq(ca2.cross(normal)) * bodyB.inv_inertia)
    let t = -vp_t / (
      (bodyA.inv_mass + bodyB.inv_mass) +
      sq((ca1.dot(tangent)) * bodyA.inv_inertia + sq(ca2.dot(tangent)) * bodyB.inv_inertia)
    )
    let jn = normal.clone().multiply(j)
    let jt = Math.abs(t) <= j * sf ?
      tangent.clone().multiply(t) :
      tangent.clone().multiply(t * kf)

    //adding the normal forces to entity
    movableA.velocity.set(
      movableA.velocity.x + jn.x * bodyA.inv_mass,
      movableA.velocity.y + jn.y * bodyA.inv_mass,
    )
    movableB.velocity.set(
      movableB.velocity.x + jn.x * -bodyB.inv_mass,
      movableB.velocity.y + jn.y * -bodyB.inv_mass,
    )
    movableA.rotation += ca1.cross(jn) * bodyA.inv_inertia
    movableB.rotation += ca2.cross(jn) * -bodyB.inv_inertia
    manifold.impulse = j

    //adding the tangent forces to entity
    movableA.velocity.set(
      movableA.velocity.x + jt.x * bodyA.inv_mass,
      movableA.velocity.y + jt.y * bodyA.inv_mass,
    )
    movableB.velocity.set(
      movableB.velocity.x + jt.x * -bodyB.inv_mass,
      movableB.velocity.y + jt.y * -bodyB.inv_mass,
    )
    movableA.rotation += ca1.cross(jt) * bodyA.inv_inertia
    movableB.rotation += ca2.cross(jt) * -bodyB.inv_inertia

    manifold.contactData.tangent.copy(tangent)

  }
}