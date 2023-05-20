import { Vector } from "../../utils/index.js"
import { Geometry } from "./geometry.js"
import { Angle } from "../../utils/index.js"
import {ShapeType} from "../settings.js"

let tmp1 = new Vector()
class Shape {
  type = ShapeType.POLYGON
  offAngle = 0
  offPosition = null
  vertices = null
  geometry = null
  constructor(vertices,offset = new Vector(),offsetAngle = 0) {
    this.offPosition = offset
    this.offAngle = offsetAngle*Math.PI/180
    this.vertices = vertices.map(v => v.clone())
    this.geometry = new Geometry(vertices)
  }
  
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "shape"
  }
  getNormals(body, target) {
    return this.geometry.getNormals(this.angle, target)
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
  draw(ctx, fillStyle) {
    const { vertices } = this.geometry
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.moveTo(vertices[0].x, vertices[0].y)
    for (var i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y)
    }
    ctx.lineTo(vertices[0].x, vertices[0].y)
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
  }
  update(position, angle, scale) {
    this.angle = this.offAngle + angle
    this.geometry.transform(this.vertices, tmp1.copy(position).add(this.offPosition), this.angle, 1 || scale, position)
  }

  getVertices() {
    return this.vertices
  }
  
  static calcInertia() {
    throw new Error("Implement in the children classes")
  }
  static CIRCLE = 0
  static POLYGON = 1
}

export {
  Shape
}