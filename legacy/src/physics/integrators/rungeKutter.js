import { Vector } from "../../utils/vector.js"

let a = new Vector()
class RungeKuttaSolver{
  static solve(body,dt){
    body.velocity.add(body.acceleration.mult(dt))
    a.copy(body.velocity)
    body.position.add(a.mult(dt))
    body.acceleration.set(0,0)
  }
}
export{
  RungeKuttaSolver
}