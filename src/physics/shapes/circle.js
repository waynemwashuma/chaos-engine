import { Shape } from "./shape.js"
import { Vector2 } from "../../math/index.js"

/**
 * A circular shape.
 * 
 * 
 * @augments Shape
 */
export class Circle extends Shape {
  type = Shape.CIRCLE
  /**
   * @param {number} radius 
   */
  constructor(radius) {
    //the first vertex is position
    //the second vertex x-position is radius
    //
    super([
      new Vector2(),
      new Vector2(radius, radius)
    ])
  }
  get position() {
    return this.vertices[0]
  }
  get radius() {
    return this.vertices[1].x
  }
  set radius(x) {
    //this.vertices[1].x = x
  }
  get area() {
    return Math.PI * this.radius * this.radius
  }
}