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
   * @param { Vector2} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(radius) {
    //the first vertex is position
    //the second vertex x-position is radius
    //
    super([
      new Vector2(),
      new Vector2(radius, radius)
    ])
    this.radius = radius
    this.type = Shape.CIRCLE
  }
  get position() {
    return this.vertices[0]
  }
  get radius() {
    return this.vertices[1].x
  }
  set radius(x) {
    this.vertices[1].x = x
  }
  get area() {
    return Math.PI * this.radius * this.radius
  }
  toJson() {
    let obj = {
      radius: this.radius,
      offset: this.offPosition,
      offAngle: this.offAngle,
      shapeType: this.type,
      type: this.CHAOS_OBJ_TYPE
    }
    return obj
  }
  fromJson(obj) {
    return new Circle(
      obj.radius
    )
  }
}