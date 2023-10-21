class Constraint {
  constructor(body1, body2) {
    this.bodies = [body1, body2]
    this.stiffness = 50
    this.dampening = 0.03
  }
  behavior(body1, body2) {
    body2.position.copy(body1.position)
  }
  update(dt, gravity) {
    this.behavior(...this.bodies, gravity)
  }
}
export {
  Constraint
}