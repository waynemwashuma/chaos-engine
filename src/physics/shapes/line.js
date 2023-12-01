import { Shape } from "./shape.js"
import { Vector2 }from "../../math/index.js"

export class Line extends Shape {
  /**
   * @type number
  */
  length = 0
  /**
   * @param {number} length
   * @param { Vector2} offset
   * @param {number} pffsetAngle
  */
  constructor(length,offset,offsetAngle) {
    let start = new Vector2(1).multiply(length / 2),
      end = new Vector2(1).multiply(-length / 2)
    super([start, end],offset,offsetAngle)
    this.length = length
  }
}