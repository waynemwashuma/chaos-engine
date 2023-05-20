function ProjectPointToAxis(point, axis) {
  return axis.dot(point)
}

function projectBodyToAxis(body, axis) {
  let min = Infinity,
    max = -Infinity,
    nearVertex = null
  for (let i = 0; i < body.vertices.length; i++) {
    let point = ProjectPointToAxis(body.vertices[i], axis)
    if (min > point) {
      min = point
      nearVertex = body.vertices[i]
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

function projectionsOverlappingLength(body1, body2, axis) {
  let p1 = projectBodyToAxis(body1, axis)
  let p2 = projectBodyToAxis(body2, axis)
  let overlap = Math.min(p1.max, p2.max) - Math.max(p1.min, p2.min)
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
  return [overlap, p1.nearVertex, axis, body1]
}

function getNormalProjectionAxisFromEdge(v1, v2) {
  return v2.clone().sub(v1).normal()
}

function getSmallestAxis(axis1, axis2, box1, box2) {
  return [projectionsOverlappingLength(box1, box2, axis1)
  , projectionsOverlappingLength(box1, box2, axis2)]
    .sort((a, b) => {
      if (a[0] > b[0]) return 1
      return -1
    })[0]
}

function BoxSAT(box1, box2) {
  let axis1 = getNormalProjectionAxisFromEdge(box1.vertices[0], box1.vertices[1])
  let axis2 = axis1.normal()
  let axis3 = getNormalProjectionAxisFromEdge(box2.vertices[0], box2.vertices[1])
  let axis4 = axis3.normal()

  let [arr] = [getSmallestAxis(axis1, axis2, box2, box1)
  , getSmallestAxis(axis3, axis4, box1, box2)].sort((a, b) => {
    if (a[0] > b[0]) return 1
    return -1
  })
  let [overlap, vertex, axis, obj] = arr
  if (overlap < 0) return;
  let contact = projectBodyToAxis(obj, axis).nearVertex
  return [contact, axis, overlap]
}
function CalcSeparationVelocities(body1, body2) {
  const collisionNormal = body1.position.clone().sub(body2.position).normal()
  const separationVelocity = body1.velocity.clone().sub(body2.velocity)
  let separation = separationVelocity.dot(collisionNormal) * Math.min(body1.restitution, body2.restitution)
  const impulse = separation / (body1.inv_mass + body2.inv_mass)
  const impulseVector = collisionNormal.clone().multiply(impulse)
  const v = collisionNormal.clone().multiply(-separation) * ((body1.elasticity + body2.elasticity) / 2)
  body1.velocity.add(impulseVector.clone().multiply(body1.inv_mass))
  body2.velocity.add(impulseVector.multiply(-body2.inv_mass))
}
function ApplyPenetrationResolution(body1, body2, manifold) {
  if (manifold.body == body2) manifold.axis.reverse()
  let overlap = manifold.overlap / (body1.inv_mass + body2.inv_mass)
  body1.position.add(manifold.axis.clone().multiply(overlap * body1.inv_mass))
  body2.position.add(manifold.axis.clone().multiply(-overlap * body2.inv_mass))
}