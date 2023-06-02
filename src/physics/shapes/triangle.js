import { Shape } from "./shape.js"
import { Vector } from "../../utils/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()
class Triangle extends Shape {
  constructor(length1, length2, angle, offset, offsetAngle) {
    let l1 = tmp1.set(1,0).multiply(length1)
    let l2 = Vector.fromDeg(angle,tmp2).multiply(length2)
    super([
       new Vector(
        -l1.x / 2,
        -l2.y / 2
      ),
        new Vector(
        l1.x / 2,
        -l2.y / 2
      ),
        new Vector(
        l2.x / 2,
        l2.y / 2
      )
      ], offset, offsetAngle)
  }
}

export {
  Triangle
}