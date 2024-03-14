import { Body2D } from "./body.js"
import { Circle,Shape } from "../shapes/index.js"


/**
 * A body with a circle shape on it.
 * 
 * @augments Body2D
 */
export class Ball extends Body2D {
  /**
   * @param {number} radius
  */
  constructor(radius) {
    super(new Circle(radius))
    this.inertia = Shape.calcInertia(this.shapes[0],this.mass)
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
    this.inertia = Shape.calcInertia(this.shapes[0],this.mass)
  }
}