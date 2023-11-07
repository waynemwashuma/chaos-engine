import { Shape } from "./shape.js"
import { Vec2, sq }from "../../math/index.js"

class Rectangle extends Shape {
  /**
   * @type number
   */
  height = 0
  /**
   * @type number
   */
  width = 0
  /**
   * @param {number} width
   * @param {number} height
   * @param { Vec2} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(width, height, offset, offsetAngle) {
    let v1 = new Vec2(-width / 2, -height / 2)
    let v2 = new Vec2(-width / 2, height / 2)
    let v3 = new Vec2(width / 2, height / 2)
    let v4 = new Vec2(width / 2, -height / 2)
    super([v1, v2, v3, v4], offset, offsetAngle)
    this.height = height
    this.width = width
  }
  /**
   * @inheritdoc
   * @param {number} mass of the body
   * @param {number} width
   * @param {number} height
   * @returns number
   */
  static calcInertia(mass, width, height) {
    return mass * (sq(width) + sq(height)) / 12
  }
  get area() {
    return this.width * this.height
  }

}

export {
  Rectangle
}