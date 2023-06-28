import { Body } from "./body.js"
import { Circle } from "../shapes/index.js"
import { Vector } from "../../math/index.js"


/**
 * A body with a circle shape on it.
 * 
 * @augments Body
 */
class Ball extends Body {
  /**
   * @param {number} radius
  */
  constructor(radius) {
    super(new Circle(radius))
    this.inertia = Circle.calcInertia(this.mass, radius)
  }
  /**
   * @inheritdoc
   * @type number 
   */
  get mass() {
    return this._mass
  }
  set mass(x) {
    this._mass = x
    this.inv_mass = x === 0 ? 0 : 1 / x
    this.inertia = Circle.calcInertia(this.mass, this.shapes[0].radius)
  }
}

export {
  Ball
}