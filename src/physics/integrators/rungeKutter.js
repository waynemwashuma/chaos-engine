import { Vector }from "../../math/index.js"

let a = new Vector()

/**
 * Runge Kutta 4 (RK-4) 
 * Has the highest accuracy but causes low performance.Greate for non real-time stuff that needs accuracy.
*/
class RungeKuttaSolver{
    /**
   * @param {Body} body
   * @param {number} dt
  */
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