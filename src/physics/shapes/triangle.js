import { Shape } from "./shape.js"
import { Vector } from "../../utils/index.js"

let tmp1 = new Vector(),
  tmp2 = new Vector()

/**
 * A triangular shape.
 * 
 * @augments Shape
 */
class Triangle extends Shape {
  /**
   * @param {number} length1 Length of one side.
   * @param {number} length2 Length of a second side.
   * @param {number} angle The angle between the two sides.
   * @param {vector} offset Positional offset from the body center.
   * @param {number} offsetAngle Angular offset from the body center.
   * 
   */
  constructor(length1, length2, angle, offset, offsetAngle) {
    let l1 = tmp1.set(1, 0).multiply(length1)
    let l2 = Vector.fromDeg(angle, tmp2).multiply(length2)
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