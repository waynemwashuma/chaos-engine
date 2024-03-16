import { Vector2, clamp } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { NarrowPhase } from "./Narrowphase.js"
import { CollisionData, CollisionManifold } from "./collisionManifold.js"
import { Shape } from "../shapes/index.js"
import { Settings } from "../settings.js"
import { Entity, Manager } from "../../ecs/index.js"
import { Body2D } from "../bodies/index.js"

const  tmp1 = {
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
  tmp5 = new Vector2()

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
export class SATNarrowphase extends NarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
  clmdrecord = new Map()
  /**
   * @param {Manager} manager
   * @param {CollisionPair[]} contactList
   * @param {CollisionManifold<Entity>[]} [clmds=[]] 
   */
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
      SATNarrowphase.shapesInBodyCollided(bodyA, bodyB, collisionData)
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
   * @param {CollisionData} manifold
   */
  static shapesInBodyCollided(body1, body2, manifold) {
    SATNarrowphase.shapesCollided(body1.shape, body2.shape, manifold)
    
    if (manifold.overlap < 0) return manifold
    
    Vector2.normal(manifold.axis, manifold.tangent)
    const contactPoints = manifold.contactPoints
    const
      axis = manifold.axis,
      shape1 = body1.shape,
      shape2 = body2.shape
    const axisReverse = Vector2.reverse(axis, tmp5)
    const overload = []
    // @ts-ignore
    const vertices1 = SATNarrowphase.findNearSupports(manifold.vertShapeA, axis, [])
    // @ts-ignore
    const vertices2 = SATNarrowphase.findNearSupports(manifold.vertShapeB, axisReverse, [])
    const balancedOverlap = manifold.overlap / (body1.inv_mass + body2.inv_mass)
    for (let i = 0; i < vertices2.length; i++) {
      if (SATNarrowphase.shapeContains(shape1, vertices2[i])) {
        overload.push(vertices2[i])
      }
    }
    if (overload.length < 2) {
      for (let i = 0; i < vertices1.length; i++) {
        if (SATNarrowphase.shapeContains(shape2, vertices1[i])) {
          overload.push(vertices1[i])
        }
      }
    }
    //some random error happened when this is not there.
    //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
    if (overload.length == 0) {
      overload.push(vertices2[0])
    }
    Vector2.multiplyScalar(axis, -balancedOverlap * body2.inv_mass, tmp4)
    Vector2.add(tmp4, overload[0], contactPoints[0])
    if (overload.length > 1) {
      Vector2.add(tmp4, overload[1], contactPoints[1])
    }

    manifold.contactNo =
      shape1.type === Shape.CIRCLE ||
      shape2.type === Shape.CIRCLE ?
      1 : clamp(overload.length, 0, 2)

    return manifold
  }
  /**
   * @param {Shape} shapeA
   * @param {Shape} shapeB
   * @param {CollisionData} target
   */
  static shapesCollided(shapeA, shapeB, target) {
    /**
     * @type {Vector2[]}
     */
    const arr = []
    Shape.getNormals(shapeA, shapeB, arr)
    Shape.getNormals(shapeB, shapeA, arr)
    SATNarrowphase.projectShapesToAxes(shapeA, shapeB, arr, target)
  }
  /**
   * @param {Shape} shapeB
   * @param {Shape} shapeA
   * @param {Vector_like[]} axes
   * @param {CollisionData} manifold
   */
  static projectShapesToAxes(shapeA, shapeB, axes, manifold) {
    const temp = tmp1
    temp.vertex = null
    temp.overlap = Infinity
    for (let i = 0; i < axes.length; i++) {
      const axis = Vector2.copy(axes[i], tmp4)
      // @ts-ignore
      const verticesA = Shape.getVertices(shapeA, axis)
      // @ts-ignore
      const verticesB = Shape.getVertices(shapeB, axis)
      const p1 = SATNarrowphase.projectVerticesToAxis(verticesA, axis, tmp2)
      const p2 = SATNarrowphase.projectVerticesToAxis(verticesB, axis, tmp3)
      const min = p1.max < p2.max ? p1.max : p2.max
      const max = p1.min > p2.min ? p1.min : p2.min
      let overlap = min - max
      if (overlap < 0) return manifold
      if (p1.max < p2.max)
        Vector2.reverse(axis, axis)
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
          Vector2.reverse(axis, axis)
        }
      }
      if (overlap < temp.overlap) {
        Vector2.copy(axis, temp.axis)
        temp.overlap = overlap
        // @ts-ignore
        temp.verticesA = verticesA
        // @ts-ignore
        temp.verticesB = verticesB
      }
    }
    if (temp.overlap > manifold.overlap) {
      Vector2.copy(temp.axis, manifold.axis)
      manifold.overlap = temp.overlap
      // @ts-ignore
      manifold.vertShapeA = temp.verticesA
      // @ts-ignore
      manifold.vertShapeB = temp.verticesB
      manifold.done = true
    }
    return manifold
  }
  /**
   * @param {Vector_like[]} vertices
   * @param {Vector_like} axis
   * @param {{ min: any; max: any; }} target
   */
  static projectVerticesToAxis(vertices, axis, target) {
    let min = Infinity,
      max = -Infinity
    const length = vertices.length

    for (let i = 0; i < length; i++) {
      const point = Vector2.dot(axis, vertices[i])
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
      const point = Vector2.dot(axis, vertices[i])
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
      return SATNarrowphase.circleContains(shape.vertices[0], shape.vertices[1].x, point)
    return SATNarrowphase.verticesContain(shape.vertices, point)
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
   * @param {Vector2} point 
   */
  static verticesContain(vertices, point) {
    const pointX = point.x,
      pointY = point.y,
      length = vertices.length
    let previous = vertices[length - 1],
      current
    if (length < 2) return false
    for (let i = 0; i < length; i++) {
      current = vertices[i];
      if ((pointX - previous.x) * (current.y - previous.y) +
        (pointY - previous.y) * (previous.x - current.x) < 0) {
        return false;
      }
      previous = current;
    }

    return true;
  }
}