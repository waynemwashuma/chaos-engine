import { Shape } from "./shape.js"
import { Vector } from "../../math/index.js"

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
   * @param {Vector} offset Positional offset from the body center.
   * @param {number} offsetAngle Angular offset from the body center.
   * 
   */
  constructor(length1, length2, angle, offset, offsetAngle) {
    let l1 = new Vector().set(1, 0).multiply(length1)
    let l2 = Vector.fromDeg(angle).multiply(length2)
    let center = tmp1.set((l1.x + l2.x) / 3, (l1.x + l2.x) / 3)
    super([
      new Vector().sub(center),
      l1.sub(center),
      l2.sub(center)
    ], offset, offsetAngle)
  }
}

export {
  Triangle
}