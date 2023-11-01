import { Shape } from "./shape.js"
import { Vec2 }from "../../math/index.js"

class Line extends Shape {
  /**
   * @type number
  */
  length = 0
  /**
   * @param {number} length
   * @param { Vec2} offset
   * @param {number} pffsetAngle
  */
  constructor(length,offset,offsetAngle) {
    let start = new Vec2(1).multiply(length / 2),
      end = new Vec2(1).multiply(-length / 2)
    super([start, end],offset,offsetAngle)
    this.length = length
  }
}

export {
  Line
}