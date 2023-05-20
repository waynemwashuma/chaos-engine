import {Vector} from "../../utils/index.js"

class FrictionSolver{
  static solve(a,b,axis,ca1,ca2,impulse) {
    let a$va = new Vector(ca1.y * -a.angVel.radian, ca1.x * a.angVel.radian)
    let a$vb = new Vector(ca2.y * -b.angVel.radian, ca2.x * b.angVel.radian)
    let va = a.velocity.clone().add(a$va)
    let vb = b.velocity.clone().add(a$vb)
    let relVel = va.sub(vb)
    let tangent = axis.normal()
    tangent = tangent.multiply(tangent.dot(relVel))
    if (tangent.magnitude() === 0)
      return
    tangent.normalize()

    let relV = tangent.dot(relVel);


    let sf = Math.min(a.staticFriction, b.staticFriction)
    let kf = Math.min(a.kineticFriction, b.kineticFriction)
    let j = -relV / (
      (a.inv_mass + b.inv_mass) +
      (ca1.dot(tangent) ** 2 * a.inv_inertia +
        ca2.dot(tangent) ** 2 * b.inv_inertia)
    )
    let jt
    if (Math.abs(j) >= impulse * sf) {
      jt = tangent.multiply(-impulse * kf)
    } else {
      jt = tangent.clone().multiply(j)
    }
    let ang1 = ca1.cross(jt) * a.inv_inertia;
    let ang2 = ca2.cross(jt) * -b.inv_inertia;
    let vel1 = jt.clone().multiply(a.inv_mass)
    let vel2 = jt.clone().multiply(-b.inv_mass)
    
    a.velocity.add(vel1)
    b.velocity.add(vel2)
    a.angVel.radian += ang1
    b.angVel.radian += ang2
  }
}

export {
  FrictionSolver
}