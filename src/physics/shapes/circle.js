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
  /**
   * @inheritdoc
   * @param {number} mass
   * @param {number} radius 
   */
  static calcInertia(mass, radius) {
    return mass * (radius * radius) / 4
  }
  /**
   * 
   * @param {Shape} shape 
   * @param { Vector2[]} [target=[]] target
   * @returns {Vector2[]}
   */
  getNormals(shape, target = []) {
    let min = null,
      vertex = null
    for (let i = 0; i < shape.vertices.length; i++) {
      let a = this.vertices[0].distanceToSquared(shape.vertices[i])
      if (!min || min > a) {
        vertex = shape.vertices[i]
        min = a
      }
    }
    if (!vertex) vertex = shape.vertices[0]
    target.push(new Vector2().copy(vertex).sub(this.vertices[0]).normalize())
    return target
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