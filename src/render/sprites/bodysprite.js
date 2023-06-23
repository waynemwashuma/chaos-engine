import { Sprite } from "./sprite.js"
import { Vector }from "../../math/index.js"
import { Shape } from "../../physics/index.js"
import { ObjType } from "../../physics/settings.js"

/**
 * This draws a body from the physics System.
 * 
 * @augments Sprite
 */
let r = new Vector()
class BodySprite extends Sprite {
  /**
   * Determine whether to draw a representation of the velocity.
   * 
   * @type {boolean}
   */
  drawVelocity = false
  /**
   * Determine whether to draw the bounding box.
   * 
   * @type {boolean}
   */
  drawBounds = false
  /**
   * @param {{}} [options={}] 
   * @param {boolean} [options.drawVelocity=false] Determine whether to draw a representation of the velocity.
   * @param {boolean} [options.drawBounds=false] Determine whether to draw the bounding box.
   */
  constructor(options = {}) {
    super()
    this.drawVelocity = options.drawVelocity || false
    this.drawBounds = options.drawBounds || false
  }
  render(renderer, dt) {

    if (this.body.physicsType == ObjType.COMPOSITE) {
      for (var i = 0; i < this.body.bodies.length; i++) {
        this.drawShapes(this.body.bodies[i], renderer)

      }
    } else {
      this.drawShapes(this.body, renderer)
    }
    if (this.drawVelocity == true)
      this._drawVelocity(this.body, renderer)
    if (this.drawBounds == true)
      this.drawBound(this.body, renderer)
  }
  _drawVelocity(body, ctx) {
    ctx.begin()
    ctx.line(
      body.position.x,
      body.position.y,
      body.position.x + body.velocity.x,
      body.position.y + body.velocity.y
    )
    ctx.stroke("cyan")
    ctx.close()
  }
  drawBound(body, renderer) {
    renderer.begin()
    if (body.bounds.r) {
      //renderer.circle(body.bounds.pos.x,body.bounds.pos.y, body.bounds.r)
    
      renderer.circle(...body.position, body.bounds.r)
    } else {
      renderer.rect(
        body.bounds.min.x,
        body.bounds.min.y,
        body.bounds.max.x - this.body.bounds.min.x,
        body.bounds.max.y - this.body.bounds.min.y
      )
    }
    renderer.stroke("red")
    renderer.close()

  }
  drawShapes(body, renderer) {
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
  BodySprite
}