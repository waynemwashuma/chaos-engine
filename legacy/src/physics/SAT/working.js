import { Vector } from "../../utils/vector.js"
//import { ctx } from "/chaos-engine/src/debug.js"
//import{SATResponse} from"./last.js"
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
class SATResponse {
  static applyPenetrationResolution(body1, body2, manifold) {
    if (!body1.inv_mass && !body2.inv_mass)
      return
    let { body, axis, overlap: a } = manifold
    axis = axis.clone()
    const overlap = a / (body1.inv_mass + body2.inv_mass)

    body1.position.add(axis.clone().multiply(overlap * body1.inv_mass))
    body2.position.add(axis.multiply(-overlap * body2.inv_mass))
  }
  static CalcLinearVelocity(a, b, axis, c) {
    let rVel = a.velocity.clone().sub(b.velocity)
    rVel = axis.dot(rVel)
    let e = Math.min(a.restitution, b.restitution)
    var j = -(1 + e) * rVel /
      (a.inv_mass + b.inv_mass)
    var jn = axis.clone().multiply(j)
    a.velocity.add(jn.clone().multiply(a.inv_mass))
    b.velocity.add(jn.clone().multiply(-b.inv_mass))
  }
  static CalcSeparationVelocities(body1, body2, axis, contactPoint) {
    if (!body1.mass && !body2.mass) {
      return [new Vector(), 0, new Vector(), 0]
    }
    let e = Math.min(body1.restitution, body2.restitution)
    let ac1 = calcCollisionArm(body1, contactPoint)
    let ac2 = calcCollisionArm(body2, contactPoint)
    let a$va = ac1.clone().normal(body1.angVel.radian)
    let a$vb = ac2.clone().normal(body2.angVel.radian)
    let va = body1.velocity.clone()
      .add(a$va)
    let vb = body2.velocity.clone()
      .add(a$vb)
    let vp = va.sub(vb)
    let vp_p = axis.dot(vp);

    if (vp_p >= 0)
      return
    //console.log(ac1.cross(axis));
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

    let r = SATResponse.ApplyFriction(body1, body2, axis, ac1, ac2, j)
    return [vel1.add(r[0]), ang1 + r[1], vel2.add(r[2]), ang2 + r[3]]
  }
  static ApplyFriction(body1, body2, axis, ac1, ac2, jn) {

    let a$va = new Vector(ac1.y*-body1.angVel.radian,ac1.x*body1.angVel.radian)
    let a$vb = new Vector(ac2.y*-body2.angVel.radian,ac2.x*body2.angVel.radian)
    let va = body1.velocity.clone().add(a$va)
    let vb = body2.velocity.clone().add(a$vb)
    let relVel = va.sub(vb)
    let tangent = axis.normal()
    tangent = tangent.multiply(tangent.dot(relVel))
    if (tangent.magnitude() === 0) {
      return [new Vector(), 0, new Vector(), 0]
    }
    tangent.normalize()

    let relV = tangent.dot(relVel);


    let sf = Math.min(body1.staticFriction, body2.staticFriction)
    let kf = Math.min(body1.kineticFriction, body2.kineticFriction)
    let j = -relV / (
      (body1.inv_mass + body2.inv_mass) +
      (ac1.dot(tangent) ** 2 * body1.inv_inertia +
        ac2.dot(tangent) ** 2 * body2.inv_inertia)
    )
    let jt
    if (Math.abs(j) >= jn * sf) {
      jt = tangent.multiply(-jn * kf)
    } else {
      jt= tangent.clone().multiply(j)
    }
    let ang1 = ac1.cross(jt) * body1.inv_inertia;
    let ang2 = ac2.cross(jt) * -body2.inv_inertia;
    let vel1 = jt.clone().multiply(body1.inv_mass)
    let vel2 = jt.clone().multiply(-body2.inv_mass)
    
    body1.velocity.add(vel1)
    body2.velocity.add(vel2)
    body1.angVel.radian += ang1
    body2.angVel.radian += ang2
    return [vel1, ang1, vel2, ang2]
  }
  static ApplyContactForce(body1, body2, gravity, axis) {
    let contact = gravity.clone()
    let force = axis.clone().multiply(axis.dot(contact) / (body1.inv_mass + body2.inv_mass))

    let vel1 = force.clone().multiply(body1.inv_mass)
    let vel2 = force.clone().multiply(-body2.inv_mass)
    return [vel1, vel2]
  }
}
class SAT {
  static bodiesCollided(body1, body2) {
    const axes1 = body1.getNormals(body2)
    const axes2 = body2.getNormals(body1)

    //TODO resolve manifold in another function
    let manifold = [SAT.projectBodiesToAxes(body2, body1, axes1), SAT.projectBodiesToAxes(body1, body2, axes2)].sort((a, b) => {
      if (a.overlap > b.overlap) return 1
      return -1
    })[0]

    let { axis, overlap, body } = manifold
    if (overlap <= 0) return null
    const vertex = SAT.projectBodyToAxis(body, axis).nearVertex
    const contactPoint = vertex.clone().add(axis.clone().multiply(overlap))
    if (body2 == body) {
      axis.reverse()
    }
    return {
      contactPoint,
      axis,
      overlap,
      body
    }
  }
  static shapesInBodyCollided(body1, body2) {
    let bestManifold
    body1.components.forEach(comp1 => {
      body2.components.forEach(comp2 => {
        let manifold = SAT.bodiesCollided(comp1, comp2)
        if (!manifold) return null
        if (!bestManifold || bestManifold.overlap < manifold.overlap) {
          bestManifold = manifold
        }
      })
    })
    return bestManifold
  }
  static projectPointToAxis(point, axis) {
    return axis.dot(point)
  }
  static projectBodiesToAxes(body1, body2, axes) {
    let manifold = null
    for (let i = 0; i < axes.length; i++) {
      let axis = axes[i].clone()

      let p1 = SAT.projectBodyToAxis(body1, axis)
      let p2 = SAT.projectBodyToAxis(body2, axis)
      let overlap = Math.min(p1.max, p2.max) - Math.max(p1.min, p2.min)
      //TODO return null here if overlap < 0
      if (p1.max < p2.max) {
        axis.reverse()
      }

      if ((p1.max > p2.max && p1.min < p2.min) ||
        (p2.max > p1.max && p2.min < p1.min)) {
        let max = Math.abs(p1.max - p2.max),
          min = Math.abs(p1.min - p2.min)
        if (min < max) {
          overlap += min
        } else {
          overlap += max
          axis.reverse()
        }
      }

      if (!manifold || overlap < manifold.overlap)
        manifold = {
          overlap,
          vertex: p1.nearVertex,
          axis,
          body: body1
        }
    }
    return manifold
  }
  static projectBodyToAxis(body, axis) {
    let min = Infinity,
      max = -Infinity,
      nearVertex = null,
      vertices = body.getVertices(axis)
    for (let i = 0; i < vertices.length; i++) {
      let point = SAT.projectPointToAxis(vertices[i], axis)
      if (min > point) {
        min = point
        nearVertex = vertices[i]
      }
      if (max < point) {
        max = point
      }
    }
    return {
      min,
      max,
      nearVertex
    }
  }
}
export {
  SAT,
  SATResponse
}