import { Vector } from "../../math/index.js"
let position = new Vector()
let acceleration = new Vector()
let velocity = new Vector()

/**
 * Verlet intergration.
 * Used so that constraints can be stable at little performance cost.
*/
class VerletSolver {
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
    body.position = position
    body.angle += body.angularVelocity * dt
  }
}
export {
  VerletSolver
}