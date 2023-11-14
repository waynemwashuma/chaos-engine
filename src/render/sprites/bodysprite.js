import { Sprite } from "./sprite.js"
import { Vector2 } from "../../math/index.js"
import { Shape } from "../../physics/index.js"
import { BasicMaterial } from "../material/index.js"
import { ObjType } from "../../physics/settings.js"
import { circle, rect, vertices, stroke, fill, line } from "../utils/index.js"



let r = new Vector2()
let material = new BasicMaterial()
material.wireframe = true
/**
 * This draws a body from the physics System.
 * 
 * @augments Sprite
 */
class BodySprite extends Sprite {
  /**
   * @private
   * @type Body
   */
  body = null
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
   * Determine whether to draw the position of the body.
   * 
   * @type {boolean}
   */
  drawPosition = true
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
  /**
   * @inheritdoc
   *  @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
  */
  render(ctx, dt) {

    if (this.body.physicsType == ObjType.COMPOSITE) {
      for (var i = 0; i < this.body.bodies.length; i++) {
        this._drawShapes(this.body.bodies[i], ctx)

      }
    } else {
      this._drawShapes(this.body, ctx)
    }
    if (this.drawVelocity == true)
      this._drawVelocity(this.body, ctx)
    if (this.drawBounds == true)
      this._drawBound(this.body, ctx)
    if (this.drawPosition)
      this._drawCenter(this.body, ctx)
  }
  _drawCenter(body, ctx) {
    ctx.beginPath()
    circle(
      ctx,
      body.position.x,
      body.position.y,
      2
    )
    fill(ctx, "black")
    ctx.closePath()
  }
  /**
   * @private
   * @param {Body} body
   * @param {CanvasRenderingContext2D} renderer
   */
  _drawVelocity(body, ctx) {
    ctx.beginPath()
    line(
      ctx,
      body.position.x,
      body.position.y,
      body.position.x + body.velocity.x,
      body.position.y + body.velocity.y
    )
    stroke(ctx, "cyan")
    ctx.closePath()
  }
  /**
   * @private
   * @param {Body} body
   * @param {CanvasRenderingContext2D} renderer
   */
  _drawBound(body, ctx) {
    ctx.beginPath()
    if (body.bounds.r) {
      circle(ctx, ...body.position, body.bounds.r)
    } else {
      rect(
        ctx,
        body.bounds.min.x,
        body.bounds.min.y,
        body.bounds.max.x - this.body.bounds.min.x,
        body.bounds.max.y - this.body.bounds.min.y
      )
    }
    stroke(ctx, "red")
    ctx.closePath()
  }
  /**
   * @private
   * @param {Body} body
   * @param {CanvasRenderingContext2D} renderer
   */
  _drawShapes(body, ctx) {
    ctx.beginPath()
    for (var i = 0; i < body.shapes.length; i++) {
      let shape = body.shapes[i]
      if (shape.type === Shape.CIRCLE) {
        circle(
          ctx,
          shape.position.x,
          shape.position.y,
          shape.radius)
        Vector2.fromRad(shape.angle, r).multiply(shape.radius)
        line(ctx, ...shape.position,
          shape.position.x + r.x,
          shape.position.y + r.y)
      } else {
        vertices(ctx, shape.vertices, true)
      }
    }
    stroke(ctx)
    ctx.closePath()
  }
  /**
   * @inheritdoc
   * @param {Entity} parent
   */
  init(parent) {
    this.body = parent.get("body")
    super.init(parent)
  }
}

export {
  BodySprite
}