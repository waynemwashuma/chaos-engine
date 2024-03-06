import { Vector2 } from "../../math/index.js"

/**
 * @template T
 */
export class CollisionManifold {
  /**
   * @type {T}
   */
  entityA
  /**
   * @type {T}
   */
  entityB
  /**
   * @type {CollisionData}
   */
  contactData = new CollisionData()
  /**
   * @type {number}
   */
  impulse = 0
  /**
   * @type {Vector2}
   */
  ca1 = new Vector2()
  /**
   * @type {Vector2}
   */
  ca2 = new Vector2()
  /**
   * @type {number}
   */
  restitution = 0
  /**
   * @type {number}
   */
  staticFriction = 0
  /**
   * @type {number}
   */
  kineticFriction = 0
  /**
   * @param {T} a
   * @param {T} b
   */
  constructor(a, b) {
    this.entityA = a
    this.entityB = b
  }
}
export class CollisionData {
  /**
   * @type {number}
   */
  lastOverlap = 0
  /**
   * @type {number}
   */
  overlap = -Infinity
  /**
   * @type {boolean}
   */
  done = false
  /**
   * @type {Vector2}
   */
  axis = new Vector2()
  /**
   * @type {Vector2}
   */
  tangent = new Vector2()
  /**
   * @type {number}
   */
  verticesA = []
  /**
   * @type {number}
   */
  verticesB = []
  /**
   * @type {number}
   */
  vertShapeA = null
  /**
   * @type {number}
   */
  vertShapeB = null
  /**
   * @type {number}
   */
  contactNo = 0
  /**
   * @type {number}
   */
  shapes = []
  /**
   * @type {number}
   */
  indexA = 0
  /**
   * @type {number}
   */
  indexB = 0
}