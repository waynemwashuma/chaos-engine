import { Shape } from "../physics/index.js"
import { BoundingBox, Vector2 } from "../math/index.js"
import { Renderer2D } from "../render-canvas2d/index.js"
import { circle, vertices, stroke, fill } from "../render/index.js"
import { Manager } from "../ecs/index.js"
/**
 * @param {Manager} manager
 * @param {BodyDebbuggerOptions} [options]
 * @param {Renderer2D} renderer
 */
// @ts-ignore
export function bodyDebugger(manager, options = {}) {
  options.clearRenderer = options.clearRenderer || false
  options.drawCollisionArm = options.drawCollisionArm || false
  options.drawContacts = options.drawContacts || false
  manager.registerSystem(dt => {
    const [transform, movable, bounds, bodies] = manager.query("transform", "movable", "bound", "body").raw()
    const clmd = manager.queryEvent("collision")
    const viewport = manager.getResource("renderer")
    const ctx = manager.getResource("ctx")
    
    if (options.clear) ctx.clearRect(0,0,viewPort.width,viewport.height)
    if (options.drawCollisionArm) drawArms()
    if (options.drawPosition) drawPositions()
    if (options.drawContacts) drawContacts()
    if (options.drawBounds) drawBounds()

    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        drawShapes(bodies[i][j].shape, ctx)
      }
    }

    function drawContacts() {
      for (let i = 0; i < clmd.length; i++) {
        let [p1, p2] = clmd[i].contactData.contactPoints
        ctx.beginPath()
        circle(ctx, p1.x, p1.y, 5)
        if (clmd[i].contactData.contactNo === 2) circle(ctx, p2.x, p2.y, 5)
        ctx.closePath()
        fill(ctx, "white")
      }
    }

    function drawPositions() {
      for (let i = 0; i < transform.length; i++) {
        for (let j = 0; j < transform[i].length; j++) {
          ctx.beginPath()
          circle(
            ctx,
            transform[i][j].position.x,
            transform[i][j].position.y,
            2
          )
          ctx.closePath()
          fill(ctx, "white")
        }
      }
    }

    function drawArms() {
      ctx.beginPath()
      for (let i = 0; i < clmd.length; i++) {
        const manifold = clmd[i]
        const { contactData: { contactNo, contactPoints } } = clmd[i]
        const [transformA] = manager.get(manifold.entityA, "transform")
        const [transformB] = manager.get(manifold.entityB, "transform")

        for (let j = 0; j < contactNo; j++) {
          drawArmRaw(ctx, transformA.position, contactPoints[j])
          drawArmRaw(ctx, transformB.position, contactPoints[j])
        }

      }
      ctx.strokeStyle = "yellow"
      ctx.stroke()
      ctx.closePath()
    }

    function drawBounds() {
      for (let i = 0; i < bounds.length; i++) {
        for (let j = 0; j < bounds[i].length; j++) {
          renderObj(
            ctx,
            bounds[i][j]
          )
          stroke(ctx, "red", 3)
        }
      }
    }
  })
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2} position
 * @param {Vector2} arm
 */
function drawArm(ctx, position, arm, color = "blue") {
  ctx.moveTo(position.x, position.y)
  ctx.lineTo(
    position.x + arm.x,
    position.y + arm.y
  )

  ctx.strokeStyle = color
  ctx.stroke()
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2} position
 * @param {Vector2} arm
 */
function drawArmRaw(ctx, position, arm) {
  ctx.moveTo(position.x, position.y)
  ctx.lineTo(
    arm.x,
    arm.y
  )
}

/**
 * @param {Shape[]} shapes
 * @param {CanvasRenderingContext2D} ctx
 */
function drawShapes(shape, ctx) {
  ctx.beginPath()
  if (shape.type === Shape.CIRCLE) {
    circle(
      ctx,
      shape.vertices[0].x,
      shape.vertices[0].y,
      shape.vertices[1].x
    )
    const r = Vector2.fromAngle(shape.angle)
    Vector2.multiplyScalar(r, shape.vertices[1].x, r)
    drawArm(ctx, shape.vertices[0], r)
  } else {
    vertices(ctx, shape.vertices, true)
  }
  ctx.lineWidth = 10
  stroke(ctx, "lightgreen", 2)
  ctx.closePath()
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {BoundingBox} bounds
 */
function renderObj(ctx, bounds) {
  const w = (bounds.max.x - bounds.min.x)
  const h = (bounds.max.y - bounds.min.y)
  ctx.strokeRect(
    bounds.min.x,
    bounds.min.y,
    w,
    h
  )
}
/**
 * @typedef BodyDebbuggerOptions
 * @property {boolean} [drawBounds=false]
 * @property {boolean} [drawPosition=false]
 * @property {boolean} [drawVelocity=false]
 * @property {boolean} [clearRenderer=false]
 * @property {boolean} [drawCollisionArm=false]
 * @property {boolean} [drawContacts]
 */