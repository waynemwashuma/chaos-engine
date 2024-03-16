import { Body2D } from "./body.js"
import { Rectangle, Shape } from "../shapes/index.js"
import { deprecate } from "../../logger/index.js"

/**
 * A body with a rectangle shape on it.
 * 
 * @augments Body2D
 */
export class Box extends Body2D {
  /**
   * @param {number} w
   * @param {number} h
   */
  constructor(w, h) {
    super(new Rectangle(w, h))
  }
}