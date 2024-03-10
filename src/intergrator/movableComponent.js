import { Vector2, Angle } from "../math/index.js"
/**
 * Component to hold requirements for an entity to move.
 * 
 */
export class Movable {
  /**
   * @param {number} [x]
   * @param {number} [y]
   * @param {number} [a]
   */
  constructor(x = 0, y = 0, a = 0) {
    this.velocity = new Vector2(x, y)
    this.rotation = a
    this.acceleration = new Vector2()
    this.torque = 0
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * @param {Vector2} force The force to be applied.
   * @param {Vector2} [arm] The collision arm.
   * @param {number} inv_mass
   * @param {number} inv_inertia
   */
  applyForce(force,inv_mass,inv_inertia, arm = Vector2.ZERO) {
    this.acceleration.add(force.multiply(inv_mass))
    this.torque += arm.cross(force) * inv_inertia
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * @param {Vector2} impulse The force to be applied.
   * @param {Vector2} [arm] The collision arm.
   * @param {number} inv_mass
   * @param {number} inv_inertia
   */
  applyImpulse(impulse,inv_mass,inv_inertia, arm = Vector2.ZERO) {
    this.velocity.add(impulse.multiply(inv_mass))
    this.rotation += arm.cross(impulse) * inv_inertia
  }
  toJson() {
    return {
      velocity: this.velocity,
      rotation: this.rotation,
      acceleration: this.acceleration
    }
  }
  /**
   * @param {*} obj
   */
  fromJson(obj) {
    this.velocity.fromJson(obj.velocity)
    this.rotation = obj.rotatjon
    this.acceleration.fromJson(obj.acceleration)
  }
}