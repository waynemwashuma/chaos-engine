import { Vector, sq } from "../../utils/index.js"
let dampen = 1
let tmp1 = new Vector(),
  tmp2 = new Vector(),
  tmp3 = new Vector(),
  tmp4 = new Vector()

class ImpulseSolver {
  static solve(manifold) {
    let { bodyA, bodyB, ca1, ca2, restitution } = manifold
    let { axis } = manifold.contactData
    let a$va = tmp1.set(ca1.y * -bodyA.rotation.radian, ca1.x * bodyA.rotation.radian)
    let a$vb = tmp2.set(ca2.y * -bodyB.rotation.radian, ca2.x * bodyB.rotation.radian)
    let va = tmp3.copy(bodyA.velocity).add(a$va)
    let vb = tmp4.copy(bodyB.velocity).add(a$vb)
    let vp = va.sub(vb)
    let vp_p = axis.dot(vp);
    
    if (vp_p >= 0) {
      manifold.impulse = 0
      return
    }
    ////this used to be -(1 + restitution) but when i changed it,stability ensued.
    //i think the reason of the previous instability is because i changed the penetration solver to be impulse based from position based.
    //so.. i came back to that....
    let j = -(restitution) * vp_p / (
      (bodyA.inv_mass + bodyB.inv_mass) +
      sq(ca1.cross(axis)) * bodyA.inv_inertia +
      sq(ca2.cross(axis)) * bodyB.inv_inertia)
    
    let jn = axis.clone().multiply(j)
    let ang1 = ca1.cross(jn) * bodyA.inv_inertia;
    let ang2 = ca2.cross(jn) * -bodyB.inv_inertia;
    let vel1 = jn.clone().multiply(bodyA.inv_mass)
    let vel2 = jn.clone().multiply(-bodyB.inv_mass)
    manifold.velA.copy(vel1)
    manifold.velB.copy(vel2)
    manifold.rotA = ang1
    manifold.rotB = ang2
    manifold.impulse = j
    
  }
}

export {
  ImpulseSolver
}