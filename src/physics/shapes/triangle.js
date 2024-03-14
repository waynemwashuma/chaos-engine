import { Shape } from "./shape.js"
import { Vector2,clamp } from "../../math/index.js"

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
    angle = clamp(angle,1,179)
    
    const l1 = new Vector2(base)
    const l2 = Vector2.fromAngle(angle)
    Vector2.multiplyScalar(l2,-height / Math.sin(angle),l2)
    
    const center = new Vector2(-(l1.x + l2.x) / 3,-l2.y / 3)
    super([
      center,
      Vector2.add(l1,center,l1),
      Vector2.add(l2,center,l2)
    ])
  }
}