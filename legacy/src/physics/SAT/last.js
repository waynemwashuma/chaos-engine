import { Vector } from "../../utils/vector.js"
//import { ctx } from "/chaos-engine/src/debug.js"
function calcCollisionArm(body, contactPoint) {
  return contactPoint.clone().sub(body.position)
}
function CalcAngularAugments(collisionArm, normal, body) {

  let angularVelocity = body.angularVelocity
  let augment = collisionArm.cross(normal)
  augment = (augment ** 2) * body.inv_inertia
  let separationVelocity = new Vector(-collisionArm.y * angularVelocity, collisionArm.x * angularVelocity)
  separationVelocity.add(body.velocity).reverse()
  return [augment, separationVelocity]
}
class SATResponse {
  static applyPenetrationResolution(body1, body2, manifold) {
    if (!body1.inv_mass && !body2.inv_mass)
      return;

    let { body, axis, overlap: a } = manifold
    axis = axis.clone()
    const overlap = a / (body1.inv_mass + body2.inv_mass)

    body1.position.add(axis.clone().multiply(overlap * body1.inv_mass))
    body2.position.add(axis.multiply(-overlap * body2.inv_mass))
  }
  static CalcSeparationVelocities(body1, body2, axis, contactPoint) {
    const restitution = Math.min(body1.restitution, body2.restitution)
    if (!body1.mass && !body2.mass) {
      if (axis.dot(body2.position) -axis.dot(body1.position) > 0) axis.reverse()
      body1.velocity = body1.velocity.reflect(axis).multiply(restitution)
      body2.velocity =body2.velocity.reflect(axis).multiply(-restitution)
      return
    }
    const collArm1 = calcCollisionArm(body1, contactPoint)
    const collArm2 = calcCollisionArm(body2, contactPoint)
    let a = CalcAngularAugments(collArm1, axis, body1)
    let b = CalcAngularAugments(collArm2, axis, body2)

    let relativeVelocity = a[1].sub(b[1])
    let separation = relativeVelocity.dot(axis)
    let diff = (1 + restitution) * separation
    let impulse = diff / (body1.inv_mass + body2.inv_mass + a[0] + b[0])
    let impulseVector = axis.clone().multiply(impulse)
    if (separation < 0) {
      //collArm1.draw(ctx,...body1.position.toArray(),"blue")
    //collArm2.draw(ctx,...body2.position.toArray(),"blue")
    //impulseVector.draw(ctx,...body2.position.toArray(),"green")
      return
      if (!body1.mass || !body2.mass){}else{return}
      impulseVector.reverse()
      let reflectionNormal = axis.normal()
      
      let velocity1 = body1.velocity.clone().sub(impulseVector.clone().multiply(body1.inv_mass)).reflect(reflectionNormal)
      
      let velocity2 = body2.velocity.clone().sub(impulseVector.clone().multiply(body2.inv_mass)).reflect(reflectionNormal)
      //body1.velocity = velocity1
      //body2.velocity = velocity2
      let angularVelocity1 = -body1.angularVelocity+collArm1.cross(impulseVector) * body1.inv_inertia
      let angularVelocity2 = -body2.angularVelocity -collArm2.cross(impulseVector) * body2.inv_inertia
      //relativeVelocity.draw(ctx,...body2.position.toArray())
      //impulseVector.draw(ctx,...body2.position.toArray(),"blue")
      //axis.clone().multiply(separation).draw(ctx,...body2.position.toArray())
      return;
    }
    let velocity1 = body1.velocity.clone().add(impulseVector.clone().multiply(body1.inv_mass))
    let velocity2 = body2.velocity.clone().add(impulseVector.clone().multiply(-body2.inv_mass))
    
    body1.velocity.copy(velocity1)
    body2.velocity.copy(velocity2)
    
    //collArm1.draw(ctx,...body1.position.toArray(),"blue")
    //collArm2.draw(ctx,...body2.position.toArray(),"blue")
    
    body1.angularVelocity += collArm1.cross(impulseVector) * body1.inv_inertia
    body2.angularVelocity -= collArm2.cross(impulseVector) * body2.inv_inertia
  }
  static ApplyContactForce(body1, body2, gravity, axis) {
    let contact = gravity.clone()
    let force = axis.clone().multiply(axis.dot(contact) / (body1.inv_mass + body2.inv_mass))

    let vel1 = force.clone().multiply(body1.inv_mass)
    let vel2 = force.clone().multiply(-body2.inv_mass)
    return [vel1,vel2]
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