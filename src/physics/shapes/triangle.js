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
   * @param {number} base Length of one side.
   * @param {number} height Length of a second side.
   * @param {number} angle The angle between the two sides.
   * @param {Vector} offset Positional offset from the body center.
   * @param {number} offsetAngle Angular offset from the body center.
   * 
   */
  constructor(base, height, angle, offset, offsetAngle) {
    let l1 = new Vector().set(1, 0).multiply(base)
    let l2 = Vector.fromRad(angle).multiply(height/Math.sin(angle))
    let center = tmp1.set((l1.x + l2.x) / 3, l2.y / 3)
    super([
      new Vector().sub(center),
      l1.sub(center),
      l2.sub(center)
    ], offset, offsetAngle)
  }
  static calcInertia(mass,base,height,angle){
    return 0.5 * mass * base * height * (1 - 2/3 * (1 - (Math.cos(2 * angle * 180/Math.PI))/2))
  }
}

export {
  Triangle
}