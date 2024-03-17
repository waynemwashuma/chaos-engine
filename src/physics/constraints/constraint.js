import { ObjType } from "../settings.js"
import { Vector2 } from "../../math/index.js"

/**
 * Base class for constructing different types of constraints.
 * 
 * @abstract
 * @see DistanceConstraint
 * @see SpringConstraint
 */
export class Constraint {
  /**
   * @type {Vector2}
   */
  localA = null
  /**
   * @type {Vector2}
   */
  localB = null
  /**
   * @type {Body2D}
   */
  body1 = null
  /**
   * @type {Body2D}
   */
  body2 = null
  /**:
   * @type {number}
   */
  stiffness = 50
  /**
   * @type {number}
   */
  dampening = 0.03
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    this.body1 = body1
    this.body2 = body2
    this.localA = localA || new Vector2()
    this.localB = localB || new Vector2()
  }
  /**
   * Determine type of object this is in the world.
   * 
   * @package
   * @type number
   */
  get physicsType() {
    return ObjType.CONSTRAINT
  }
  /**
   * Will refactor this out later.
   * 
   * @protected
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {number} dt
   */
  behavior(body1, body2, dt) {
    body2.position.copy(body1.position)
  }
  /**
   * Updates constraint forces
   *
   * @param {number} dt
   */
  update(dt) {
    this.behavior(this.body1, this.body2, dt)
  }
}