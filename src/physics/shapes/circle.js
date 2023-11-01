import { Shape } from "./shape.js"
import { Vec2 } from "../../math/index.js"

let _vec1 = new Vec2()
let _vec2 = new Vec2()
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
   * @param { Vec2} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(radius, offset, offsetAngle) {

    //the first vertex is position 
    super([], offset, offsetAngle)
    this.vertices = [new Vec2(), new Vec2(), new Vec2()]
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
   * @param { Vec2} axis
   * @param { Vec2[]} out 
   * @returns { Vec2[]}
   */
  getVertices(axis, out) {
    let target = out || []
    let v1 = _vec1.copy(axis).multiply(-this.radius).add(this.position)
    let v2 = _vec2.copy(axis).multiply(this.radius).add(this.position)
    target[0] = v1.clone()
    target[1] = v2.clone()
    return target
  }
  /**
   * 
   * @param {Shape} shape 
   * @param { Vec2[]} [target=[]] target
   * @returns Array< Vec2>
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
   * @param { Vec2} position
   * @param {number} angle
   * @param {number} scale 
   */
  update(position, angle, scale) {
    this.position.copy(position).add(this.offPosition)
    this.angle = this.offAngle + angle
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
      obj.radius,
      new Vec2().fromJson(obj.offset),
      obj.offAngle
    )
  }
}

export {
  Circle
}