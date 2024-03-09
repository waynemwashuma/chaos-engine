import { Shape } from "../physics/index.js"
import { Vector2 } from "../math/index.js"
import { line, circle, vertices, stroke, fill } from "../render/index.js"
/**
 * @param {Manager} manager
 * @param {BodyDebbuggerOptions} [options]
 */
export function bodyDebugger(manager, options = {}) {
  options.clearRenderer = options.clearRenderer || false
  options.drawCollisionArm = options.drawCollisionArm || false
  options.drawContacts = options.drawContacts || false
  manager.registerSystem(dt => {
    const [transform, movable, bounds, bodies] = manager.query("transform", "movable", "bounds", "body").raw()
    const clmd = manager.queryEvent("collision")
    const renderer = manager.getResource("renderer")

    if (options.clearRenderer) renderer.clear()
    if (options.drawCollisionArm) drawArms()
    if (options.drawPosition) drawPositions()
    if (options.drawContacts) drawContacts()
    if (options.drawBounds) drawBounds()
    
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        drawShapes(bodies[i][j].shapes, renderer.ctx)
      }
    }

    function drawContacts() {
      for (let i = 0; i < clmd.length; i++) {
        let [p1, p2] = clmd[i].contactData.contactPoints
        renderer.ctx.beginPath()
        circle(renderer.ctx, p1.x, p1.y, 5)
        if(clmd[i].contactData.contactNo === 2)circle(renderer.ctx, p2.x, p2.y, 5)
        renderer.ctx.closePath()
        fill(renderer.ctx, "white")
      }
    }

    function drawPositions() {
      for (let i = 0; i < transform.length; i++) {
        for (let j = 0; j < transform[i].length; j++) {
          renderer.ctx.beginPath()
          circle(
            renderer.ctx,
            transform[i][j].position.x,
            transform[i][j].position.y,
            2
          )
          renderer.ctx.closePath()
          fill(renderer.ctx, "white")
        }
      }
    }

    function drawArms() {
      renderer.ctx.beginPath()
      for (let i = 0; i < clmd.length; i++) {
        const manifold = clmd[i]
        const [transformA] = manager.get(manifold.entityA, "transform")
        const [transformB] = manager.get(manifold.entityB, "transform")

        drawArm(renderer.ctx, transformA.position, manifold.ca1, "yellow")
        drawArm(renderer.ctx, transformB.position, manifold.ca2, "yellow")
      }
      renderer.ctx.closePath()
    }

    function drawBounds() {
      for (let i = 0; i < bounds.length; i++) {
        for (let j = 0; j < bounds[i].length; j++) {
          renderObj(
            renderer.ctx,
            bounds[i][j]
          )
          stroke(renderer.ctx, "red", 3)
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

function drawShapes(shapes, ctx) {
  ctx.beginPath()
  for (var i = 0; i < shapes.length; i++) {
    let shape = shapes[i]
    if (shape.type === Shape.CIRCLE) {
      circle(
        ctx,
        shape.position.x,
        shape.position.y,
        shape.radius
      )
      const r = Vector2.fromAngle(shape.angle).multiply(shape.radius)
      drawArm(ctx, shape.position, r)
    } else {
      vertices(ctx, shape.vertices, true)
    }
  }
  ctx.lineWidth = 10
  stroke(ctx, "lightgreen", 2)
  ctx.closePath()
}

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
 */