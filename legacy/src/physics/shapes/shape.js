import { Vector } from "../../utils/vector.js"
import { Geometry } from "./geometry.js"
import {Angle} from "../../utils/degree.js"

class Shape {
  rad = 0
  scale = 1
  _rotation = new Angle()
  _position = new Vector()
  constructor(pos, vertices) {
    this.type = this.constructor.name.toLowerCase()
    this.position = pos
    this.vertices = [...vertices]
    this.geometry = new Geometry(this.position, this.vertices)
  }
  getNormals() {
    return this.geometry.getNormals(this._rotation.radian)
  }
  set angle(angle) {
    this._rotation.degree = angle
  }
  get angle() {
    return this._rotation.degree
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
  draw(ctx,fillStyle) {
    const { vertices } = this
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
    ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
  updateVertices() {
    this.vertices = this.geometry.transform(this.position, this._rotation.radian, this.scale)
  }
  update() {
    this.updateVertices()
  }
  
  getVertices() {
    return this.vertices
  }
  init(parent){
    this._rotation = parent.rotation
    this._position = parent.position
    this.updateVertices()
  }
  set position(p) {
    this._position.copy(p)
  }

  set rotation(r) {
    this._rotation.copy(r)
  }
  
  get position() {
    return this._position
  }

  get rotation() {
    return this._rotation
  }
}

export {
  Shape
}