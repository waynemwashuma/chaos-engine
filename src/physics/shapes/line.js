import { Shape } from "./shape.js"
import { Vector2 } from "../../math/index.js"

export class Line extends Shape {
  /**
   * @param {number} length
   * @param { Vector2} offset
   * @param {number} offsetAngle
   */
  constructor(length) {
    const start = new Vector2(length / 2)
    const end = new Vector2(-length / 2)
    super([start, end])
  }
}