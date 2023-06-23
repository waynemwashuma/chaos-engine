import { Vector }from "../../math/index.js"

let a = new Vector()
class EulerSolver{
  static solve(body,dt){
    body.velocity.add(body.acceleration.multiply(dt))
    a.copy(body.velocity)
    body.position.add(a.multiply(dt))
    body.angle += body.angularVelocity * dt
    body.acceleration.set(0,0)
  }
}
export{
  EulerSolver
}