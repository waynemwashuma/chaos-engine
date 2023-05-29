import { Shape } from "./shape.js"
import { Vector } from "../../utils/index.js"

let _vec1 = new Vector()
let _vec2 = new Vector()
let _arr = []

/**
 * @augments Shape
*/
class Circle extends Shape {
  position = new Vector()
  angle = 0
  radius = 0
  type = Shape.CIRCLE
  /**
   * @param {number} radius 
   * @param {vector} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(radius, offset, offsetAngle) {
    super([], offset, offsetAngle)
    this.radius = radius
  }
  static calcInertia(mass, radius) {
    return mass * (radius * radius) / 4
  }
  /**
   * 
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
   * @param {[]} [target=[]] target
  */
  getNormals(shape, target=[]) {
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
  */
  update(position, angle,scale) {
    this.position.copy(position).add(this.offPosition)
    this.angle = this.offAngle + angle
  }
  draw(ctx, fillStyle) {
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    ctx.lineWidth = 1
    ctx.stroke()
    if (fillStyle) {
      ctx.fillStyle = fillStyle
      ctx.fill()
    }
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(0, 0, 2, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(0, 0)
    let r = Vector.fromDeg(this.angle).multiply(this.radius)
    ctx.lineTo(...r)
    ctx.stroke()
    ctx.closePath()
  }
  drawNormals() {}
  get area() {
    return Math.PI * this.radius * this.radius
  }
}

export {
  Circle
}