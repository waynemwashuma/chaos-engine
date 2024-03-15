import { Shape } from "./shape.js"
import { Vector2 } from "../../math/index.js"

export class Rectangle extends Shape {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    let v1 = new Vector2(-width / 2, -height / 2)
    let v2 = new Vector2(-width / 2, height / 2)
    let v3 = new Vector2(width / 2, height / 2)
    let v4 = new Vector2(width / 2, -height / 2)
    super([v1, v2, v3, v4])
  }
}