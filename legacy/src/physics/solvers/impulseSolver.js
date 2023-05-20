import {Vector} from "../../utils/index.js"
function calcCollisionArm(body, contactPoint) {
  return contactPoint.clone().sub(body.position)
}
function CalcAngularAugments(collisionArm, normal, body) {

  let angularVelocity = body.angVel.radian
  let augment = collisionArm.cross(normal)
  augment = (augment ** 2) * body.inv_inertia
  let separationVelocity = new Vector(-collisionArm.y * angularVelocity, collisionArm.x * angularVelocity)
  separationVelocity.add(body.velocity).reverse()
  return [augment, separationVelocity]
}
class ImpulseSolver {
  static solveLinearOnly(a, b, axis) {
    let rVel = a.velocity.clone().sub(b.velocity)
    rVel = axis.dot(rVel)
    let e = Math.min(a.restitution, b.restitution)
    var j = -(1 + e) * rVel /
      (a.inv_mass + b.inv_mass)
    var jn = axis.clone().multiply(j)
    a.velocity.add(jn.clone().multiply(a.inv_mass))
    b.velocity.add(jn.clone().multiply(-b.inv_mass))
  }
  static solve(body1, body2, axis, ac1,ac2,e) {
    if (!body1.mass && !body2.mass)
      return 
    
    let a$va = new Vector(ac1.y * -body1.angVel.radian, ac1.x * body1.angVel.radian)
    let a$vb = new Vector(ac2.y * -body2.angVel.radian, ac2.x * body2.angVel.radian)
    let va = body1.velocity.clone()
      .add(a$va)
    let vb = body2.velocity.clone()
      .add(a$vb)
    let vp = va.sub(vb)
    let vp_p = axis.dot(vp);

    if (vp_p >= 0)
      return 0
    
    let j = -(1 + e) * vp_p / (
      (body1.inv_mass + body2.inv_mass) +
      (ac1.cross(axis) ** 2 * body1.inv_inertia +
        ac2.cross(axis) ** 2 * body2.inv_inertia)
    )
    let jn = axis.clone().multiply(j)
    
    let ang1 = ac1.cross(jn) * body1.inv_inertia;
    let ang2 = ac2.cross(jn) * -body2.inv_inertia;
    let vel1 = jn.clone().multiply(body1.inv_mass)
    let vel2 = jn.clone().multiply(-body2.inv_mass)
    body1.velocity.add(vel1)
    body2.velocity.add(vel2)
    body1.angVel.radian += ang1
    body2.angVel.radian += ang2
    
    return j
  }
}

export{
  ImpulseSolver
}