import { Vector } from "../../utils/index.js"
let position = new Vector()
let acceleration = new Vector()
let velocity = new Vector()
class VerletSolver {
  static solve(body, dt) {
    acceleration.copy(body.acceleration).multiply(dt * 0.5)
    velocity.copy(body.velocity)
    position.copy(body.position)
    body.acceleration.set(0,0)
    body.velocity.add(acceleration)
    position.add(velocity.multiply(dt)).add(acceleration.multiply(dt))
    body.position = position
    body.angle += body.angularVelocity * dt
  }
}
export {
  VerletSolver
}