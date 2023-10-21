import { Vector } from "../../utils/vector.js"
//import { ctx } from "/chaos-engine/src/debug.js"

const _cachedVec = new Vector()
const _cachedVec2 = new Vector()
const SAT = {
  bodiesCollided(body1, body2) {
    const axes1 = body1.getNormals(body2)
    const axes2 = body2.getNormals(body1)

    let manifold = SAT.doubleprojection(body1, body2, axes1, axes2)
    if (manifold == null) return null
    let { axis, overlap, body } = manifold
    if (overlap <= 0) return null
    if (body2 == body) {
      axis.reverse()
    }
    const overload = []
    const vertices1 = SAT.projectShapeToAxis(body1, axis).nearVertices
    const vertices2 = SAT.projectShapeToAxis(body2, axis.reverse()).nearVertices
    axis.reverse();
    for (var i = 0; i < vertices1.length; i++) {
      if (SAT.shapeContains(body2, vertices1[i]))
        overload.push(vertices1[i])
    }
    if (overload.length < 2) {
      for (var i = 0; i < vertices2.length; i++) {
        if (SAT.shapeContains(body1, vertices2[i]))
          overload.push(vertices2[i])
      }
    }
    if(overload.length == 0){
      overload.push(vertices1[0])
    }
    let contactPoints = overload.map(e => {
      return e.clone()
        .add(axis.clone()
          .multiply(overlap)
        )
    })
    //axis.draw(ctx,...body2.position,"yellow",100)
    return {
      contactPoints,
      axis,
      overlap,
      body
    }
  },
  doubleprojection(body1, body2, axes1, axes2) {
    let man1 = SAT.projectShapesToAxis(body2, body1, axes1)
    if (man1 == null) return null
    let man2 = SAT.projectShapesToAxis(body1, body2, axes2)

    if (man2 == null) return null
    if (man1.overlap > man2.overlap)
      return man2
    return man1
  },
  shapesInBodyCollided(body1, body2) {
    let bestManifold = null
    for (var i = 0; i < body1.components.length; i++) {
      for (var j = 0; j < body2.components.length; j++) {
        let manifold = SAT.bodiesCollided(body1.components[i], body2.components[j])
        if (bestManifold == null || bestManifold.overlap < manifold.overlap) {
          bestManifold = manifold
        }
      }
    }
    return bestManifold
  },
  projectShapesToAxis(body1, body2, axes) {
    let manifold = null
    for (let i = 0; i < axes.length; i++) {
      let axis = axes[i].clone()

      let p1 = SAT.projectShapeToAxis(body1, axis)
      if (p1 == null) return null
      let p2 = SAT.projectShapeToAxis(body2, axis)
      if (p2 == null) return null
      let overlap = Math.min(p1.max, p2.max) - Math.max(p1.min, p2.min)

      if (overlap < 0) return null

      if (p1.max < p2.max) axis.reverse()
      if (
        (p1.max > p2.max && p1.min < p2.min) ||
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
      if (!manifold || overlap < manifold.overlap) {
        manifold = {
          overlap,
          vertex: p1.nearVertices[0],
          axis,
          body: body1,
          collidingShapes: [body1, body2]
        }
        continue
      }
    }
    return manifold
  },
  projectShapeToAxis(shape, axis) {
    let min = Infinity,
      max = -Infinity,
      nearVertices = [],
      index = -1,
      vertices = shape.getVertices(axis)

    for (let i = 0; i < vertices.length; i++) {
      let point = axis.dot(vertices[i])
      if (Math.abs(point - min) <= 1) {
        nearVertices.push(vertices[i])
        continue
      }
      if (point < min) {
        min = point
        nearVertices = [vertices[i]]
        index = i
      }
      if (point > max) {
        max = point
      }
    }
    return {
      min,
      max,
      nearVertices,
      index
    }
  },
  shapeContains(shape,point){
    if(shape.type == "circle")
    return SAT.circleContains(shape.position,shape.radius,point)
    return SAT.verticesContain(shape.vertices,point)
  },
  circleContains(position, radius, point) {
    let dx = point.x - position.x,
      dy = point.y - position.y
    if (dx * dx + dy * dy > radius * radius)
      return false
    return true
  },
  verticesContain(vertices, point) {
    var pointX = point.x,
      pointY = point.y,
      length = vertices.length,
      vertex = vertices[length - 1],
      nextVertex;
    if(length < 2)return false
    for (var i = 0; i < length; i++) {
      nextVertex = vertices[i];
      if ((pointX - vertex.x) * (nextVertex.y - vertex.y) +
        (pointY - vertex.y) * (vertex.x - nextVertex.x) < 0) {
        return false;
      }
      vertex = nextVertex;
    }

    return true;
  }
}
export {
  SAT
}