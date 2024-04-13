import { Vector2, clamp } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { CollisionData, CollisionManifold } from "./collisionManifold.js"
import { Shape2D } from "../shapes/index.js"
import { Settings } from "../settings.js"
import { Manager } from "../../ecs/index.js"
import { Body2D } from "../bodies/index.js"
import { canCollide, shapeContains, generatePairID } from "./utils.js"

const
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

export class Contacts extends Array{}

export class SATNarrowphase2D {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
  clmdrecord = new Map()
}

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
export class SATNarrowphase2DPlugin {
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource(new Contacts())
    manager.setResource(new SATNarrowphase2D())

    manager.registerSystem(getSATContacts)
  }
}

/**
 * @param {Manager} manager
 */
function getSATContacts(manager) {
  const narrowphase = manager.getResource("satnarrowphase2d")
  const pairs = manager.getResource("collisionpairs")
  const contacts = manager.getResource("contacts")
  contacts.length = 0
  for (let i = 0; i < pairs.length; i++) {
    const { entityA, entityB } = pairs[i]
    const getA = manager.get(entityA, "transform", "movable", "shape2d","physicsproperties")
    const getB = manager.get(entityB, "transform", "movable", "shape2d","physicsproperties")
    if(!getA || !getB)continue
    const [transformA, movableA, shapeA, propertiesA] = getA
    const [transformB, movableB, shapeB, propertiesB] = getB
    if (!canCollide(propertiesA,propertiesB))
      continue

    propertiesA.sleep = false
    propertiesB.sleep = false
    const id = generatePairID(entityA, entityB)
    if (!narrowphase.clmdrecord.has(id))
      narrowphase.clmdrecord.set(id, new CollisionManifold(
        entityA,
        entityB,
        transformA.position,
        transformB.position,
        movableA,
        movableB,
        propertiesA,
        propertiesB
      ))
    const manifold = narrowphase.clmdrecord.get(id)
    const collisionData = manifold.contactData

    collisionData.overlap = -Infinity
    collisionData.done = false
    shapesInBodyCollided(shapeA, shapeB, propertiesA.invmass, propertiesB.invmass, collisionData)
    if (collisionData.overlap < 0 || !collisionData.done) continue
    manifold.restitution = propertiesA.restitution < propertiesB.restitution ? propertiesA.restitution : propertiesB.restitution
    //manifold.staticFriction = bodyA.staticFriction < bodyB.staticFriction ? bodyA.staticFriction : bodyB.staticFriction
    manifold.kineticFriction = propertiesA.kineticFriction < propertiesB.kineticFriction ? propertiesA.kineticFriction : propertiesB.kineticFriction
    
    contacts.push(manifold)
  }
}

/**
 * @param {Body2D} body1
 * @param {Body2D} body2
 * @param {CollisionData} out
 */
function shapesInBodyCollided(shapeA, shapeB, invmassA, invmassB, out) {
  /*** @type {Vector2[]}*/
  const arr = []
  Shape2D.getNormals(shapeA, shapeB, arr)
  Shape2D.getNormals(shapeB, shapeA, arr)
  projectShapesToAxes(shapeA, shapeB, arr, out)

  if (out.overlap < 0) return out

  Vector2.normal(out.axis, out.tangent)
  const contactPoints = out.contactPoints
  const axis = out.axis
  const axisReverse = Vector2.reverse(axis, tmp5)
  const overload = []
  // @ts-ignore
  const vertices1 = findNearSupports(out.vertShapeA, axis, [])
  // @ts-ignore
  const vertices2 = findNearSupports(out.vertShapeB, axisReverse, [])
  const balancedOverlap = out.overlap / (invmassA + invmassB)
  for (let i = 0; i < vertices2.length; i++) {
    if (shapeContains(shapeA, vertices2[i])) {
      overload.push(vertices2[i])
    }
  }
  if (overload.length < 2) {
    for (let i = 0; i < vertices1.length; i++) {
      if (shapeContains(shapeB, vertices1[i])) {
        overload.push(vertices1[i])
      }
    }
  }
  //some random error happened when this is not there.
  //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
  if (overload.length == 0) {
    overload.push(vertices2[0])
  }
  Vector2.multiplyScalar(axis, -balancedOverlap * invmassB, tmp4)
  Vector2.add(tmp4, overload[0], contactPoints[0])
  if (overload.length > 1) {
    Vector2.add(tmp4, overload[1], contactPoints[1])
  }

  out.contactNo =
    shapeA.type === Shape2D.CIRCLE ||
    shapeB.type === Shape2D.CIRCLE ?
    1 : clamp(overload.length, 0, 2)

  return out
}

/**
 * @param {Shape2D} shapeB
 * @param {Shape2D} shapeA
 * @param {Vector_like[]} axes
 * @param {CollisionData} manifold
 */
function projectShapesToAxes(shapeA, shapeB, axes, manifold) {
  let vertex = null
  let minVerticesA = null
  let minVerticesB = null
  let minOverlap = Infinity
  let minaxis = new Vector2()

  for (let i = 0; i < axes.length; i++) {
    const axis = Vector2.copy(axes[i], tmp4)
    // @ts-ignore
    const verticesA = Shape2D.getVertices(shapeA, axis)
    // @ts-ignore
    const verticesB = Shape2D.getVertices(shapeB, axis)
    const p1 = projectVerticesToAxis(verticesA, axis, tmp2)
    const p2 = projectVerticesToAxis(verticesB, axis, tmp3)
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
        //Vector2.reverse(axis, axis)
      }
    }
    if (overlap < minOverlap) {
      Vector2.copy(axis, minaxis)
      minOverlap = overlap
      // @ts-ignore
      minVerticesA = verticesA
      // @ts-ignore
      minVerticesB = verticesB
    }
  }
  if (minOverlap > manifold.overlap) {
    Vector2.copy(minaxis, manifold.axis)
    manifold.overlap = minOverlap
    // @ts-ignore
    manifold.vertShapeA = minVerticesA
    // @ts-ignore
    manifold.vertShapeB = minVerticesB
    manifold.done = true
  }
  return manifold
}
/**
 * @param {Vector_like[]} vertices
 * @param {Vector_like} axis
 * @param {{ min: any; max: any; }} target
 */
function projectVerticesToAxis(vertices, axis, out) {
  let min = Infinity,
    max = -Infinity
  const length = vertices.length

  for (let i = 0; i < length; i++) {
    const point = Vector2.dot(axis, vertices[i])
    if (point < min) min = point
    if (point > max) max = point
  }
  out.min = min
  out.max = max
  return out
}
/**
 * @param { Vector2[]} vertices
 * @param { Vector2} axis
 * @param { Vector2[]} target
 */
function findNearSupports(vertices, axis, target = []) {
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