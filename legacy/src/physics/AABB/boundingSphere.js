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
    if (body.radius) {
      this.r = padding + body.radius
      return
    }

  }
}