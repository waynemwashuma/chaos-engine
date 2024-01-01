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
   * @type {Body}
   */
  body1 = null
  /**
   * @type {Body}
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
   * @param {Body} body1
   * @param {Body} body2
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
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
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
  toJson() {
    return {
      body1: this.body1.id,
      body2: this.body2.id,
      localA: this.localA.toJson(),
      localB: this.localB.toJson(),
      stiffness: this.stiffness,
      dampening: this.dampening,
      type: this.CHAOS_OBJ_TYPE
    }
  }
  fromJson(obj, world) {
    let bod1 = world.getById(obj.body1)
    let bod2 = world.getById(obj.body2)

    let constraint = new Constraint(
      bod1,
      bod2,
      new Vector2().fromJson(obj.localA),
      new Vector2().fromJson(obj.localB)
    )
    constraint.stiffness = obj.stiffness
    constraint.dampening = obj.dampening
    return constraint
  }
}