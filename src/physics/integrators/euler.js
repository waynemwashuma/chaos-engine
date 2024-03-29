import { Vector2 }from "../../math/index.js"

let a = new Vector2()

/**
 * Semi implicit euler integration.
 * More stable than explicit euler intergration.
*/
export class EulerSolver{
  /**
   * @param {Body2D} body
   * @param {number} dt
  */
  static solve(body,dt){
    body.velocity.add(body.acceleration.multiply(dt))
    a.copy(body.velocity)
    body.position.add(a.multiply(dt))
    body.angularVelocity += body.angularAcceleration * dt
    body.angle += body.angularVelocity * dt
    body.acceleration.set(0,0)
    body.torque.value = 0
  }
}