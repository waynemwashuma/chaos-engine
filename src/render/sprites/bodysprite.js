import {Sprite } from "./sprite.js"
import { Vector } from "/src/index.js"
import {Shape} from "../../physics/index.js"
import { ObjType } from "../../physics/settings.js"

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
    //console.log(this.body.physicsType)
    if(this.body.physicsType == ObjType.COMPOSITE){
      for (var i = 0; i < this.body.bodies.length; i++) {
        this.drawShapes(this.body.bodies[i],renderer)
        
      }
    }else{
      this.drawShapes(this.body,renderer)
    if (this.drawVelocity == true)
      this.drawVelocity(this.body,renderer)
    if (this.drawBounds == true)
      this.drawBounds(this.body,renderer)
    }
  }
  drawVelocity(body,ctx) {
    ctx.begin()
    ctx.line(
      body.position.x,
      body.position.y,
      body.position.x + body.velocity.x,
      body.position.y + body.velocity.y
    )
    ctx.stroke("cyan")
    ctx.close
  }
  drawBounds(body,renderer) {
    renderer.begin()
    renderer.rect(
      body.bounds.min.x,
      body.bounds.min.y,
      body.bounds.max.x - this.body.bounds.min.x,
      body.bounds.max.y - this.body.bounds.min.y
    )
    renderer.stroke("red")
    renderer.close()

  }
  drawShapes(body,renderer) {
    renderer.begin()
    for (var i = 0; i < body.shapes.length; i++) {
      let shape = body.shapes[i]
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