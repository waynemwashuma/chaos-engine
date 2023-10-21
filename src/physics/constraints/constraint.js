import { ObjType } from "../settings.js"
import { Vector } from "../../math/index.js"

/**
 * Base class for constructing different types of constraints.
 * 
 * @abstract
 * @see DistanceConstraint
 * @see SpringConstraint
 */
class Constraint {
  /**
   * @param {Body} body1
   * @param {Body} body2
   * @param {Vector} localA
   * @param {Vector} localB
   */
  constructor(body1, body2, localA, localB) {
    this.body1 = body1
    this.body2 = body2
    this.localA = localA || new Vector()
    this.localB = localB || new Vector()
    this.stiffness = 50
    this.dampening = 0.03
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
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "constraint"
  }
  /**
   * Will refactor this out later.
   * 
   * @protected
   * @param {Body} body1
   * @param {Body} body2
   * @param {number} dt
   */
  behavior(body1, body2,dt) {
    body2.position.copy(body1.position)
  }
  /**
   * Updates constraint forces
   *
   * @param {number} dt
   */
  update(dt) {
    this.behavior(this.body1, this.body2,dt)
  }
}
export {
  Constraint
}