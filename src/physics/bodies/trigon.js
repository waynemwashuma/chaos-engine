import { Body2D } from "./body.js"
import { Triangle, Shape } from "../shapes/index.js"
import { deprecate } from "../../logger/index.js"

export class Trigon extends Body2D {
  /**
   * @param {number} base
   * @param {number} height
   * @param {number} angle Angle in radians
   * 
   */
  constructor(base, height, angle = Math.PI / 3) {
    super(new Triangle(base, height, angle))
  }
}