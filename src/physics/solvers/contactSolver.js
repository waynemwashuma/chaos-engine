import { Vector } from "../../utils/index.js"
let v = { x: 0, y: 0 }

let velocityLimit = 1
let angularVelocityLimit = 1
let impulselimit = 0.8

/**
*/
export const ContactSolver = {
  solve(a, b, impulse, contactNo) {
    if (contactNo == 2) {
      if (Math.abs(a.angularVelocity) > angularVelocityLimit) a.angularVelocity = 0
      if (Math.abs(b.angularVelocity) > angularVelocityLimit) b.angularVelocity = 0
    }
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