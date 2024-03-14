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
  applyForce(force, inv_mass, inv_inertia, arm = Vector2.ZERO) {
    Vector2.set(
      this.acceleration,
      this.acceleration.x + force.x * inv_mass,
      this.acceleration.y + force.y * inv_mass
    )
    this.torque += Vector2.cross(arm,force) * inv_inertia
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * @param {Vector2} impulse The force to be applied.
   * @param {Vector2} [arm] The collision arm.
   * @param {number} inv_mass
   * @param {number} inv_inertia
   */
  applyImpulse(impulse, inv_mass, inv_inertia, arm = Vector2.ZERO) {
    Vector2.set(
      this.velocity,
      this.velocity.x + impulse.x * inv_mass,
      this.velocity.y + impulse.y * inv_mass
    )
    this.rotation += Vector2.cross(arm,impulse) * inv_inertia
  }
}