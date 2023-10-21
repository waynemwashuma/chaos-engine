import { Vector } from "../../utils/index.js"
let v = { x: 0, y: 0 }

let velocityLimit = 0
let angularVelocityLimit = 0
let impulselimit = 0

class ContactSolver {
  static solve(a, b, impulse) {
    //console.log(a.velocity.magnitude(),a.angularVelocity,impulse)
    if (impulse > impulselimit) return
    if (a.velocity.magnitude() > velocityLimit && Math.abs(a.angularVelocity) > angularVelocityLimit) return
    if (b.velocity.magnitude() > velocityLimit && Math.abs(b.angularVelocity) > angularVelocityLimit) return
    if (!a.allowSleep || !b.allowSleep)
      return
    a.sleeping = true
    a.velocity = v
    a.acceleration = v
    b.sleeping = true
    b.velocity = v
    b.acceleration = v
  }
}

export {
  ContactSolver
}