import { Shape } from "./shape.js"
import { Vector2 } from "../../math/index.js"

/**
 * A circular shape.
 * 
 * 
 * @augments Shape
 */
export class Circle extends Shape {
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
    this.type = Shape.CIRCLE
  }
  
  //TODO - Remove these getters and setters
  /**
  */
  get position() {
    return this.vertices[0]
  }
  get radius() {
    return this.vertices[1].x
  }
}