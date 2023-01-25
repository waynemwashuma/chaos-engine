import { Vector } from "/utils/vector.js"
import { Geometry } from "./geometry.js"

class Shape {
  rad = 0
  scale = 1
  constructor(pos, vertices) {
    this.position = new Vector().copy(pos)
    this.vertices = [...vertices]
    this.geometry = new Geometry(this.position, this.vertices)
  }
  getNormals() {
    return this.geometry.getNormals(this.rad)
  }
  set angle(angle) {
    this.rad = angle * Math.PI / 180
  }
  get angle() {
    return this.rad * 180 / Math.PI
  }
  drawNormals(ctx, scale = 10) {
    const { vertices } = this
    if (vertices.length < 2) return;
    let center, normal
    ctx.beginPath()
    ctx.strokeStyle = "green"
    for (var i = 0; i < vertices.length - 1; i++) {
      center = vertices[i + 1].clone().sub(vertices[i]).multiply(.5)
      normal = center.normal()
      center = vertices[i].clone().add(center)
      ctx.moveTo(center.x, center.y)
      ctx.lineTo((normal.x * scale) + center.x, (normal.y * scale) + center.y)

      ctx.stroke()
    }
    center = vertices[0].clone().sub(vertices[vertices.length - 1]).multiply(.5)
    normal = center.normal()
    center = vertices[vertices.length - 1].clone().add(center)
    ctx.moveTo(center.x, center.y)
    ctx.lineTo((normal.x * scale) + center.x, (normal.y * scale) + center.y)
    ctx.stroke()
    ctx.strokeStyle = "black"
    ctx.closePath()
  }
  draw(ctx) {
    const { vertices } = this
    ctx.beginPath()
    ctx.moveTo(vertices[0].x, vertices[0].y)
    for (var i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y)
    }
    ctx.lineTo(vertices[0].x, vertices[0].y)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
  updateVertices() {
    this.vertices = this.geometry.transform(this.position, this.rad, this.scale)
  }
  update() {
    this.angle = this.angle > 360 ? 360 - this.angle : this.angle
    this.updateVertices()
  }
  projectOnAxis(axis) {
    let min = Infinity,
      max = -Infinity,
      nearVertex = null
    for (let i = 0; i < this.vertices.length; i++) {
      let point = ProjectPointToAxis(this.vertices[i], axis)
      if (min > point) {
        min = point
        nearVertex = body.vertices[i]
      }
      if (max < point) {
        max = point
      }
    }
    return {
      min,
      max,
      nearVertex
    }
  }
  getNormalAxes() {
    return this.geometry.normals
  }
  getVertices() {
    return this.vertices
  }
}

export {
  Shape
}