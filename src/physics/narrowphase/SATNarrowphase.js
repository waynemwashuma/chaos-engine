import { Vector2, clamp } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { NarrowPhase } from "./Narrowphase.js"
import { CollisionManifold } from "./collisionManifold.js"
import { Shape } from "../shapes/index.js"
import { Settings } from "../settings.js"

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
    max: 0
  },
  tmp3 = {
    min: 0,
    max: 0
  },
  tmp4 = new Vector2(),
  tmp5 = new Vector2(),
  tmp6 = new Vector2()

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
export class SATNarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
  clmdrecord = new Map()
  getCollisionPairs(manager, contactList, clmds = []) {
    for (let i = 0; i < contactList.length; i++) {
      const { a, b } = contactList[i]
      const [bodyA] = manager.get(a, "body")
      const [bodyB] = manager.get(b, "body")

      if (!NarrowPhase.canCollide(bodyA, bodyB)) continue
      if (bodyA.aabbDetectionOnly || bodyB.aabbDetectionOnly) continue

      bodyA.sleeping = false
      bodyB.sleeping = false
      const id = bodyA.id > bodyB.id ? bodyA.id + " " + bodyB.id : bodyB.id + " " + bodyA.id
      if (!this.clmdrecord.has(id))
        this.clmdrecord.set(id, new CollisionManifold(a, b))
      const manifold = this.clmdrecord.get(id)
      const collisionData = manifold.contactData
      collisionData.overlap = -Infinity
      collisionData.done = false
      SATNarrowPhase.shapesInBodyCollided(bodyA, bodyB, collisionData)
      if (collisionData.overlap < 0 || !collisionData.done) continue
      manifold.restitution = bodyA.restitution < bodyB.restitution ? bodyA.restitution : bodyB.restitution
      manifold.staticFriction = bodyA.staticFriction < bodyB.staticFriction ? bodyA.staticFriction : bodyB.staticFriction
      manifold.kineticFriction = bodyA.kineticFriction < bodyB.kineticFriction ? bodyA.kineticFriction : bodyB.kineticFriction
      //if (bodyA.collisionResponse && bodyB.collisionResponse)
      clmds.push(manifold)
    }
    return clmds
  }
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {Manifold} manifold
   */
  static shapesInBodyCollided(body1, body2, manifold) {
    SATNarrowPhase.shapesCollided(body1.shapes[0], body2.shapes[0], manifold)
    if (manifold.overlap < 0) return manifold
    const
      axis = manifold.axis,
      shape1 = body1.shapes[0],
      shape2 = body2.shapes[0]
    const overload = []
    const vertices1 = SATNarrowPhase.findNearSupports(manifold.vertShapeA, axis, [])
    const vertices2 = SATNarrowPhase.findNearSupports(manifold.vertShapeB, tmp6.copy(axis).reverse(), [])
    const balancedOverlap = manifold.overlap / (body1.inv_mass + body2.inv_mass)
    for (let i = 0; i < vertices2.length; i++) {
      if (SATNarrowPhase.shapeContains(shape1, vertices2[i])) {
        overload.push(vertices2[i])
      }
    }
    if (overload.length < 2) {
      for (let i = 0; i < vertices1.length; i++) {
        if (SATNarrowPhase.shapeContains(shape2, vertices1[i])) {
          overload.push(vertices1[i])
        }
      }
    }
    //some random error happened when this is not there.
    //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
    if (overload.length == 0) {
      overload.push(vertices2[0])
    }
    manifold.contactPoints[0].copy(overload[0]).add(tmp4.copy(axis).multiply(-balancedOverlap * body2.inv_mass))
    if (overload.length > 1) {
      manifold.contactPoints[1]
        .copy(overload[1])
        .add(tmp4.copy(axis).multiply(-balancedOverlap * body2.inv_mass))

    }

    manifold.contactNo =
      shape1.type === Shape.CIRCLE ||
      shape2.type === Shape.CIRCLE ?
      1 : clamp(overload.length, 0, 2)
    manifold.axis.normalFast(manifold.tangent)
    manifold.axis.reverse()
    return manifold
  }
  /**
   * @param {Shape} shape1
   * @param {Shape} shape2
   * @param {Object} target
   */
  static shapesCollided(shape1, shape2, target) {
    const arr = _arr
    Utils.clearArr(arr)
    Shape.getNormals(shape1, shape2, arr)
    Shape.getNormals(shape2, shape1, arr)

    SATNarrowPhase.projectShapesToAxes(shape1, shape2, arr, target)
  }
  /**
   * @param {Shape} shapeA
   * @param {Shape} shapeB
   * @param { Vector2[]} axes
   * @param {Manifold} shapeA
   * @param {number} iu
   */
  static projectShapesToAxes(shapeA, shapeB, axes, manifold) {
    const temp = tmp1
    temp.vertex = null
    temp.body = null
    temp.overlap = Infinity
    for (let i = 0; i < axes.length; i++) {
      const axis = tmp4.copy(axes[i])

      const verticesA = Shape.getVertices(shapeA, axis)
      const verticesB = Shape.getVertices(shapeB, axis)
      const p1 = SATNarrowPhase.projectVerticesToAxis(verticesA, axis, tmp2)
      const p2 = SATNarrowPhase.projectVerticesToAxis(verticesB, axis, tmp3)
      const min = p1.max < p2.max ? p1.max : p2.max
      const max = p1.min > p2.min ? p1.min : p2.min
      let overlap = min - max
      if (overlap < 0) return manifold

      if (p1.max < p2.max) axis.reverse()
      if (
        (p1.max > p2.max && p1.min < p2.min) ||
        (p2.max > p1.max && p2.min < p1.min)
      ) {
        const max = Math.abs(p1.max - p2.max),
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
        temp.indexA = p1.indexN
        temp.indexB = p2.indexN
        temp.verticesA = verticesA
        temp.verticesB = verticesB
      }
    }
    if (temp.overlap > manifold.overlap) {
      manifold.overlap = temp.overlap
      manifold.axis.copy(temp.axis)
      manifold.vertShapeA = temp.verticesA
      manifold.vertShapeB = temp.verticesB
      manifold.done = true
    }
    return manifold
  }
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param {Object} target
   */
  static projectVerticesToAxis(vertices, axis, target) {
    let min = Infinity,
      max = -Infinity
    const length = vertices.length

    for (let i = 0; i < length; i++) {
      let point = axis.dot(vertices[i])
      if (point < min) min = point
      if (point > max) max = point
    }
    target.min = min
    target.max = max
    return target
  }
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param { Vector2[]} target
   */
  static findNearSupports(vertices, axis, target = []) {
    let min = Infinity

    for (let i = 0; i < vertices.length; i++) {
      const point = axis.dot(vertices[i])
      if (
        Math.abs(point - min) <= Settings.separationTolerance &&
        !target.includes(vertices[i])
      ) {
        target.push(vertices[i])
        continue
      }
      if (point < min) {
        min = point
        Utils.clearArr(target)
        target.push(vertices[i])
        i = -1
      }
    }
    return target
  }
  /**
   * @param {Shape} shape
   * @param { Vector2} point
   */
  static shapeContains(shape, point) {
    if (shape.type == Shape.CIRCLE)
      return SATNarrowPhase.circleContains(shape.position, shape.radius, point)
    return SATNarrowPhase.verticesContain(shape.vertices, point)
  }
  /**
   * @param { Vector2} position
   * @param {number} radius
   * @param { Vector2} point
   */
  static circleContains(position, radius, point) {
    const dx = point.x - position.x,
      dy = point.y - position.y
    if (dx * dx + dy * dy > radius * radius)
      return false
    return true
  }
  /**
   * @param { Vector2[]} vertices
   * @param {number} point 
   */
  static verticesContain(vertices, point) {
    const pointX = point.x,
      pointY = point.y,
      length = vertices.length
    let vertex = vertices[length - 1],
      nextVertex;
    if (length < 2) return false
    for (let i = 0; i < length; i++) {
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