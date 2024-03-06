import { Vector2 } from "../../math/index.js"
import { Utils } from "../../utils/index.js"

const _arr = [],
  tmp1 = {
    overlap: 0,
    verticesA: null,
    verticesB: null,
    axis: new Vector2(),
    vertex: null,
    shape: null
  },
  tmp2 = {
    min: 0,
    max: 0,
    indexN: 0
  },
  tmp3 = {
    min: 0,
    max: 0,
    indexN: 0
  },
  tmp4 = new Vector2(),
  tmp5 = new Vector2(),
  tmp6 = new Vector2()

/**
 * Used for narrowphase collision detection and contact info generation.
 */
export const SAT = {
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {Manifold} manifold
   */
  shapesInBodyCollided(body1, body2, manifold) {
    let shapesA = body1.shapes,
      shapesB = body2.shapes
    for (var i = 0; i < shapesA.length; i++) {
      for (var j = 0; j < shapesB.length; j++) {
        SAT.shapesCollided(shapesA[i], shapesB[j], manifold)
      }
    }
    if (manifold.overlap < 0) return manifold
    let body = manifold.dorminantShape,
      axis = tmp5.copy(manifold.axis),
      shape1 = manifold.shapes[0],
      shape2 = manifold.shapes[1]
    let overload = []
    const vertices1 = SAT.findNearSupports(manifold.vertShapeA, axis, [])
    const vertices2 = SAT.findNearSupports(manifold.vertShapeB, tmp6.copy(axis).reverse(), [])
    for (var i = 0; i < vertices1.length; i++) {
      if (SAT.shapeContains(shape2, vertices1[i])) {
        overload.push(vertices1[i])
      }
    }
    if (overload.length < 2) {
      for (var i = 0; i < vertices2.length; i++) {
        if (SAT.shapeContains(shape1, vertices2[i])) {
          overload.push(vertices2[i])
          if (!overload.length)
            shape = shape2
        }
      }
    }
    //some random error happened when this is not there.
    //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
    if (overload.length == 0) {
      overload.push(vertices1[0])
    }

    overload = SAT.findNearSupports(overload, axis, [])
    if (body == shape2) axis.reverse()
    if (body == shape1) {
      manifold.verticesA[0] = overload[0]
      manifold.verticesB[0] = overload[0].clone().add(tmp6.copy(axis).multiply(manifold.overlap))
      if (overload.length == 2) {
        manifold.verticesA[1] = overload[1]
        manifold.verticesB[1] = overload[1].clone().add(tmp6.copy(axis).multiply(manifold.overlap))
      }
    }
    if (body == shape2) {
      manifold.verticesB[0] = overload[0].clone().sub(tmp6.copy(axis).multiply(manifold.overlap))
      manifold.verticesA[0] = overload[0]
      if (overload.length == 2) {
        manifold.verticesB[1] = overload[1].clone().sub(tmp6.copy(axis).multiply(manifold.overlap))
        manifold.verticesA[1] = overload[1]
      }
    }
    manifold.contactNo = overload.length
    return manifold
  },
  /**
   * @param {Shape} shape1
   * @param {Shape} shape2
   * @param {Object} target
   */
  shapesCollided(shape1, shape2, target) {
    let arr = _arr,
      boundary
    Utils.clearArr(arr)
    shape1.getNormals(shape2, arr)
    boundary = arr.length
    shape2.getNormals(shape1, arr)

    SAT.projectShapesToAxes(shape1, shape2, arr, target, boundary)
  },
  /**
   * @param {Shape} shapeA
   * @param {Shape} shapeB
   * @param { Vector2[]} axes
   * @param {Manifold} shapeA
   * @param {number} iu
   */
  projectShapesToAxes(shapeA, shapeB, axes, manifold, iu) {
    let temp = tmp1
    temp.vertex = null
    temp.body = null
    temp.overlap = Infinity
    for (let i = 0; i < axes.length; i++) {
      let axis = tmp4.copy(axes[i])

      let verticesA = shapeA.getVertices(axis)
      let verticesB = shapeB.getVertices(axis)
      let p1 = SAT.projectVerticesToAxis(verticesA, axis, tmp2)
      let p2 = SAT.projectVerticesToAxis(verticesB, axis, tmp3)
      let min = p1.max < p2.max ? p1.max : p2.max
      let max = p1.min > p2.min ? p1.min : p2.min
      let overlap = min - max
      if (overlap < 0) return manifold

      if (p1.max < p2.max) axis.reverse()
      if (
        (p1.max > p2.max && p1.min < p2.min) ||
        (p2.max > p1.max && p2.min < p1.min)
      ) {
        let max = Math.abs(p1.max - p2.max),
          min = Math.abs(p1.min - p2.min)
        if (min < max) {
          overlap += min
        } else {
          overlap += max
          axis.reverse()
        }
      }
      if (overlap < temp.overlap) {
        temp.overlap = overlap
        temp.axis.copy(axis)
        temp.shape = i <= iu - 1 ? shapeB : shapeA
        temp.indexA = p1.indexN
        temp.indexB = p2.indexN
        temp.verticesA = verticesA
        temp.verticesB = verticesB
      }
    }
    if (temp.overlap > manifold.overlap) {
      manifold.overlap = temp.overlap
      manifold.axis.copy(temp.axis)
      manifold.dorminantShape = temp.shape
      manifold.shapes[0] = shapeA
      manifold.shapes[1] = shapeB
      manifold.vertShapeA = temp.verticesA
      manifold.vertShapeB = temp.verticesB
      manifold.indexA = temp.indexA
      manifold.indexB = temp.indexB
      manifold.done = true
    }
    return manifold
  },
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param {Object} target
   */
  projectVerticesToAxis(vertices, axis, target) {
    let min = Infinity,
      max = -Infinity,
      nearVertex = null,
      length = vertices.length

    for (let i = 0; i < length; i++) {
      let point = axis.dot(vertices[i])
      if (point < min) {
        min = point
        nearVertex = i
      }
      if (point > max) {
        max = point
      }
    }
    target.min = min
    target.max = max
    target.indexN = nearVertex
    return target
  },
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param { Vector2[]} target
   * @param {number} nearVertexIndex
   */
  findNearSupports(vertices, axis, target = [], nearVertexIndex) {
    let min = Infinity,
      nearVertices = target,
      length = vertices.length

    for (let i = 0; i < length; i++) {
      let point = axis.dot(vertices[i])
      if (
        Math.abs(point - min) <= 0.1 &&
        !nearVertices.includes(vertices[i])
      ) {
        nearVertices.push(vertices[i])
        continue
      }
      if (point < min) {
        min = point
        Utils.clearArr(nearVertices)
        nearVertices.push(vertices[i])
        i = -1
      }
    }
    return nearVertices
  },
  /**
   * @param {Shape} shape
   * @param { Vector2} point
   */
  shapeContains(shape, point) {
    if (shape.type == "circle")
      return SAT.circleContains(shape.position, shape.radius, point)
    return SAT.verticesContain(shape.vertices, point)
  },
  /**
   * @param { Vector2} position
   * @param {number} radius
   * @param { Vector2} point
   */
  circleContains(position, radius, point) {
    let dx = point.x - position.x,
      dy = point.y - position.y
    if (dx * dx + dy * dy > radius * radius)
      return false
    return true
  },
  /**
   * @param { Vector2[]} vertices
   * @param {number} point 
   */
  verticesContain(vertices, point) {
    var pointX = point.x,
      pointY = point.y,
      length = vertices.length,
      vertex = vertices[length - 1],
      nextVertex;
    if (length < 2) return false
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