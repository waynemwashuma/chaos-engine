import { Vector } from "../../utils/index.js"
//import { ctx } from "/chaos-engine/src/debug.js"

class PenetrationSolver {
  static solve(body1, body2, manifold) {
    if (!body1.inv_mass && !body2.inv_mass)
      return
    let {body, axis, overlap: a } = manifold
    const overlap = a / (body1.inv_mass + body2.inv_mass)
    
    body1.position.add(axis.clone().multiply(overlap * body1.inv_mass))
    body2.position.add(axis.clone().multiply(-overlap * body2.inv_mass))
  }
}
 
export {
  PenetrationSolver
}