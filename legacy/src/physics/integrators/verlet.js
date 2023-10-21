import { Vector } from "../../utils/vector.js"
let position = new Vector()
let acceleration = new Vector()
let velocity = new Vector()
let velocity2 = new Vector()
let arr = [position, velocity]
class VerletSolver {
  static solve(body, dt) {
    acceleration.copy(body.acceleration).multiply(dt * 0.5)
    velocity2.copy(body.velocity)
    position.copy(body.position)
    velocity.copy(body.velocity).add(acceleration)
    position.add(velocity2.multiply(dt)).add(acceleration.multiply(dt))
    body.position = position
    body.velocity.copy(velocity)
    body.angle += body.angularVelocity * dt
    return arr
  }
}
export {
  VerletSolver
}