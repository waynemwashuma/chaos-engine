import { Vector2 } from "../../math/index.js"
let position = new Vector2()
let acceleration = new Vector2()
let velocity = new Vector2()

/**
 * Verlet intergration.
 * Used so that constraints can be stable at little performance cost.
 */
export class VerletSolver {
  /**
   * @param {Body} body
   * @param {number} dt
   */
  static solve(body, dt) {
    acceleration.copy(body.acceleration).multiply(dt * 0.5)
    velocity.copy(body.velocity)
    position.copy(body.position)
    body.acceleration.set(0, 0)
    body.velocity.add(acceleration)
    position.add(velocity.multiply(dt)).add(acceleration.multiply(dt))
    body.velocity.add(acceleration)
    body.position = position
    body.angularVelocity += body.angularAcceleration * dt * 0.5
    body.angle += body.angularVelocity * dt
    body.angularVelocity += body.angularAcceleration * dt * 0.5
    body.torque.value = 0
  }
}