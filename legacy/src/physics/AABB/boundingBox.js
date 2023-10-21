import { AABB } from "./AABB.js"

class AABBox {
  constructor(minX, minY, maxX, maxY) {
    this.pos = {
      x: 0,
      y: 0
    }
    this.max = {
      x: maxX,
      y: maxY
    }
    this.min = {
      x: minX,
      y: minY
    }
    this.padding = 0
  }
  intersects(bound) {
    if (bound.r)
      return AABB.AABBvsSphere(this, bound)
    return AABB.AABBColliding(this, bound)
  }
  calculateBounds(body, padding = 0) {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER
      
    if(body.components.length == 0){
      this.min.x = body.position.x
      this.max.x = body.position.x
      this.min.y = body.position.y
      this.max.y = body.position.y
      this.pos.x = body.position.x
      this.pos.y = body.position.y
      return
    }
    for (var i = 0; i < body.components.length; i++) {
      let shape = body.components[i]
      if (shape.type == "circle") {
        let idx = body.position.x - shape.radius,
          idy = body.position.y - shape.radius,
          mdx = body.position.x + shape.radius,
          mdy = body.position.y + shape.radius
        if (!minX || idx < minX) minX = idx
        if (!maxX || mdx > maxX) maxX = mdx
        if (!minY || idy < minY) minY = idy
        if (!maxY || mdy > maxY) maxY = mdy
        continue
      }
      for (var j = 0; j < shape.vertices.length; j++) {
        let vertex = shape.vertices[j]
        if (vertex.x < minX)minX = vertex.x
        if (vertex.x > maxX) maxX = vertex.x
        if (vertex.y < minY) minY = vertex.y
        if (vertex.y > maxY) maxY = vertex.y
      }
    }
    this.min.x = minX - padding
    this.max.x = maxX + padding
    this.min.y = minY - padding
    this.max.y = maxY + padding
    this.pos.x = body.position.x
    this.pos.y = body.position.y
    this.padding = padding
  }
  update(pos) {
    let dx = pos.x - this.pos.x
    let dy = pos.y - this.pos.y

    this.pos.x = pos.x
    this.pos.y = pos.y
    this.min.x += dx
    this.max.x += dx
    this.min.y += dy
    this.max.y += dy
  }
  draw(ctx) {
    ctx.strokeStyle = "red"
    ctx.moveTo(this.min.x, this.min.y)
    ctx.lineTo(this.min.x, this.max.y)
    ctx.lineTo(this.max.x, this.max.y)
    ctx.lineTo(this.max.x, this.min.y)
    ctx.lineTo(this.min.x, this.min.y)
    ctx.stroke()
    ctx.strokeStyle = "black"
  }
}
export {
  AABBox
}