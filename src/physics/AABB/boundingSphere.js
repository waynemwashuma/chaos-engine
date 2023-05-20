import { AABB } from "./AABB.js"

class BoundingSphere {
  constructor(r = 0) {
    this.type = "sphere"
    this.r = r
    this.pos = { x: 0, y: 0 }
  }
  intersects(bound) {
    if (bounding.r)
      AABB.boundSpheresColliding(this, bound)
    AABB.AABBvsSphere(bound, this)
  }
  draw(ctx) {
    ctx.strokeStyle = "red"
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = "black"
  }
  calculateBounds(body, padding = 0) {
    let radsq = 0,
      shape,
      vertex,
      tmp
    for (var i = 0; i < body.shapes.length; i++) {
      shape = body.shapes[i]
      if (shape.radius) {
        tmp = shape.radius * shape.radius
        if (tmp > radsq) radsq = tmp
        continue
      }
      for (var j = 0; j < body.shapes[i].vertices.length; j++) {
        vertex = body.shapes[i].vertices
        tmp = vertex.distanceToSquared(body.position)
        if (tmp > radsq) radsq = tmp
      }
    }
    this.pos.x = body.position.x
    this.pos.y = body.position.y
    this.r = Math.sqrt(radsq)
  }
}