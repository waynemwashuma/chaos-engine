import { ObjType } from "../settings.js"
import { Vec2 } from "../../math/index.js"

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
   * @param { Vec2} localA
   * @param { Vec2} localB
   */
  constructor(body1, body2, localA, localB) {
    this.body1 = body1
    this.body2 = body2
    this.localA = localA || new Vec2()
    this.localB = localB || new Vec2()
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
      type:this.CHAOS_OBJ_TYPE
    }
  }
  fromJson(obj, world) {
    let bod1 = world.getById(obj.body1)
    let bod2 = world.getById(obj.body2)

    let constraint = new Constraint(
      bod1,
      bod2,
      new Vec2().fromJson(obj.localA),
      new Vec2().fromJson(obj.localB)
    )
    constraint.stiffness = obj.stiffness
    constraint.dampening = obj.dampening
    return constraint
  }
}
export {
  Constraint
}