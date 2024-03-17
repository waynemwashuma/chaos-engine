import { Body2D } from "./body.js"
import { Circle } from "../shapes/index.js"


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
  }
}