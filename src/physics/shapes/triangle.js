import { Shape } from "./shape.js"
import { Vector2,clamp } from "../../math/index.js"

let tmp1 = new Vector2()

/**
 * A triangular shape.
 * 
 * @augments Shape
 */
export class Triangle extends Shape {
  /**
   * @param {number} base Length of one side.
   * @param {number} height Length of a second side.
   * @param {number} angle The angle between the two sides.
   * @param { Vector2} offset Positional offset from the body center.
   * @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(base, height, angle) {
    angle = clamp(angle,1,189)
    const l1 = new Vector2().set(1, 0).multiply(base)
    const l2 = Vector2.fromAngle(angle).multiply(-height / Math.sin(angle))
    const center = tmp1.set((l1.x + l2.x) / 3, l2.y / 3)
    super([
      new Vector2().sub(center),
      l1.sub(center),
      l2.sub(center)
    ])
  }
  /**
   * @param {number} mass
   * @param {number} base
   * @param {number} height
   * @param {number} angle
   */
  static calcInertia(mass, base, height, angle) {
    return 0.5 * mass * base * height * (1 - 2 / 3 * (1 - (Math.cos(2 * angle * 180 / Math.PI)) / 2))
  }
}