import { Shape } from "./shape.js"
import { Vector2 }from "../../math/index.js"

export class Line extends Shape {
  /**
   * @param {number} length
   * @param { Vector2} offset
   * @param {number} offsetAngle
  */
  constructor(length) {
    let start = new Vector2(1).multiply(length / 2),
      end = new Vector2(1).multiply(-length / 2)
    super([start, end])
  }
}