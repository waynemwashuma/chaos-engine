import {Shape} from"./shape.js"
import {Vector} from "../../utils/vector.js"

class Circle extends Shape {
  constructor(position, radius) {
    super(position, [])
    this.radius = radius
    this.type = "circle"
  }
  static getInertia(mass) {
    return mass * (this.radius ** 2) / 4
  }
  getVertices(axis) {
    let v1 = axis.clone().multiply(-this.radius).add(this.position)
    let v2 = axis.clone().multiply(this.radius).add(this.position)
    return [v1, v2]
  }
  getNormals(body) {
    let min = null,
      vertex = null
    for (let i = 0; i < body.vertices.length; i++) {
      let a = this.position.distanceToSquared(body.vertices[i])
      if (!min || min > a) {
        vertex = body.vertices[i]
        min = a
      }
    }
    if (!vertex) vertex = body.position
    return [vertex.clone().sub(this.position).normalize()]
  }
  draw(ctx,fillStyle) {
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.lineWidth = 1
    ctx.stroke()
    if (fillStyle) {
      ctx.fillStyle = fillStyle
      ctx.fill()
    }
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(...this.position)
    let r = Vector.fromDeg(this.angle).multiply(this.radius).add(this.position)
    ctx.lineTo(...r)
    ctx.stroke()
    ctx.closePath()
  }
  drawNormals() {}
}

export {
  Circle
}