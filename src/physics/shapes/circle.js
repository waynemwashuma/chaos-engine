import { Shape } from "./shape.js"
import { Vector } from "../../math/index.js"

let _vec1 = new Vector()
let _vec2 = new Vector()
let _arr = []

/**
 * A circular shape.
 * 
 * 
 * @augments Shape
 */
class Circle extends Shape {
  angle = 0
  radius = 0
  /**
   * @param {number} radius 
   * @param {Vector} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(radius, offset, offsetAngle) {

    //the first vertex is position 
    super([], offset, offsetAngle)
    this.vertices = [new Vector(), new Vector(), new Vector()]
    this.radius = radius
    this.type = Shape.CIRCLE
  }
  get position() {
    return this.vertices[0]
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
   * @inheritdoc
   * 
   * @param {Vector} axis
   * @param {Vector[]}} target 
   * @returns {Vector[]}
   */
  getVertices(axis, target) {
    target = target || []
    let v1 = _vec1.copy(axis).multiply(-this.radius).add(this.position)
    let v2 = _vec2.copy(axis).multiply(this.radius).add(this.position)
    target[0] = v1.clone()
    target[1] = v2.clone()
    return target
  }
  /**
   * 
   * @param {Shape} shape 
   * @param {Vector[]} [target=[]] target
   * @returns Array<Vector>
   */
  getNormals(shape, target = []) {
    let min = null,
      vertex = null
    for (let i = 0; i < shape.vertices.length; i++) {
      let a = this.position.distanceToSquared(shape.vertices[i])
      if (!min || min > a) {
        vertex = shape.vertices[i]
        min = a
      }
    }
    if (!vertex) vertex = shape.position
    target.push(_vec1.copy(vertex).sub(this.position).normalize().clone())
    return target
  }
  /**
   * @inheritdoc
   * 
   * @param {Vector} position
   * @param {number} angle
   * @param {numbe} scale 
   */
  update(position, angle, scale) {
    this.position.copy(position).add(this.offPosition)
    this.angle = this.offAngle + angle
  }
  get area() {
    return Math.PI * this.radius * this.radius
  }
}

export {
  Circle
}