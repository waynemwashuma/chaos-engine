import {Sprite } from "./sprite.js"
import { Vector } from "/src/index.js"
import {Shape} from "../../physics/index.js"

let r = new Vector()
class BodyMesh extends Sprite {
  drawVelocity = false
  drawBounds = false
  constructor(options ={}) {
    super()
    this.drawVelocity = options.drawVelocity || false
    this.drawBounds = options.drawBounds || false
  }
  update(renderer, dt) {
    this.drawShape(renderer)
    if (this.drawVelocity == true)
      this.drawVelocity(renderer)
    if (this.drawBounds == true)
      this.drawBounds(renderer)
  }
  drawVelocity(ctx) {
    ctx.begin()
    ctx.line(
      this.position.x,
      this.position.y,
      this.position.x + this.body.velocity.x,
      this.position.y + this.body.velocity.y
    )
    ctx.stroke("cyan")
    ctx.close
  }
  drawBounds(renderer) {
    renderer.begin()
    renderer.rect(
      this.body.bounds.min.x,
      this.body.bounds.min.y,
      this.body.bounds.max.x - this.body.bounds.min.x,
      this.body.bounds.max.y - this.body.bounds.min.y
    )
    renderer.stroke("red")
    renderer.close()

  }
  drawShape(renderer) {
    renderer.begin()
    for (var i = 0; i < this.body.shapes.length; i++) {
      let shape = this.body.shapes[i]
      if (shape.type == Shape.CIRCLE) {
        renderer.circle(
          shape.position.x,
          shape.position.y,
          shape.radius)
        Vector.fromRad(shape.angle, r).multiply(shape.radius)
        renderer.line(...shape.position,
          shape.position.x + r.x,
          shape.position.y + r.y)
      } else {
        renderer.vertices(shape.vertices, true)
      }
    }
    renderer.stroke()
    renderer.close()
  }
  init(parent) {
    this.body = parent.get("body")
    super.init(parent)
  }
}

export {
  BodyMesh
}