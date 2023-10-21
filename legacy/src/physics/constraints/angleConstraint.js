import {Vector} from "../../utils/vector.js"
import { Constraint } from "./constraint.js"

class AngleConstraint extends Constraint {
  constructor(body1, body2, rotationCenter) {
    super(body1, body2)
    this.center = new Vector().copy(rotationCenter)
    this.arms = [body1.position.clone().sub(this.center), body2.position.clone().sub(this.center)]
    this.angle = Vector.getAbsDegBtwn(this.arms[0], this.arms[1])
  }
  behavior(body1, body2) {
    let [arm1, arm2] = this.arms
    //arm1.draw(renderer.ctx, this.center.x, this.center.y)
    //arm2.draw(renderer.ctx, this.center.x, this.center.y, "blue")

  }
}

export {
  AngleConstraint
}