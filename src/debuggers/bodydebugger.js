import { Shape2D } from "../physics/index.js"
import { BoundingBox, Vector2 } from "../math/index.js"
import { circle, vertices, stroke, fill } from "../render/index.js"
import { Manager } from "../ecs/index.js"
import { deprecate } from "../logger/index.js"

/**
 * @deprecated
 * @param {Manager} manager
 * @param {BodyDebbuggerOptions} [options]
 */
// @ts-ignore
export function bodyDebugger(manager, options = {}) {
  deprecate("bodyDebugger()", "Body2DDebugger()")
  manager.registerPlugin(new Body2DDebugger(options))
}

export class Body2DDebugger {
  /**
   * @param {BodyDebbuggerOptions} options
   */
  constructor(options = {}) {
    options.drawCollisionArm = options.drawCollisionArm || false
    options.drawContacts = options.drawContacts || false
    options.drawPosition = options.drawPosition || false
    options.drawVelocity = options.drawVelocity || false
    options.drawBounds = options.drawBounds || false
    options.drawShapes = options.drawShapes || true
    this.options = options
  }
  register(manager) {
    const { options } = this
    if (options.clearViewport)
      manager.registerSystem(manager => {
        const ctx = manager.getResource("ctx")
        const viewport = manager.getResource("viewport")

        ctx.clearRect(0, 0, viewport.width, viewport.height)
      })
    if (options.drawPosition) manager.registerSystem(drawPosition)
    if (options.drawBounds) manager.registerSystem(drawBounds)
    if (options.drawShapes) manager.registerSystem(drawShapes)
    if (options.drawCollisionArm) manager.registerSystem(drawArms)
    if (options.drawContacts) manager.registerSystem(drawContacts)
    if (options.drawPosition)
      if (options.drawVelocity) manager.registerSystem(drawVelocity)
  }
}

function drawShapes(manager) {
  const ctx = manager.getResource("ctx")
  const query = manager.query("shape2d")
  query.each(shape => {
    ctx.beginPath()
    if (shape.type === Shape2D.CIRCLE) {
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
    stroke(ctx, "lightgreen", 2)
    ctx.closePath()
  })
}

function drawArms(manager) {
  const contacts = manager.getResource("contacts")
  const ctx = manager.getResource("ctx")

  ctx.beginPath()
  for (let i = 0; i < contacts.length; i++) {
    const posA = manager.get(contacts[i].entityA, "transform")[0].position
    const posB = manager.get(contacts[i].entityB, "transform")[0].position
    for (let j = 0; j < contacts[i].contactData.contactNo; j++) {
      drawArmRaw(ctx, posA, contacts[i].contactData.contactPoints[j])
      drawArmRaw(ctx, posB, contacts[i].contactData.contactPoints[j])
    }
  }
  ctx.strokeStyle = "yellow"
  ctx.stroke()
  ctx.closePath()
}

function drawContacts(manager) {
  const ctx = manager.getResource("ctx")
  const clmd = manager.getResource("contacts")
  for (let i = 0; i < clmd.length; i++) {
    let [p1, p2] = clmd[i].contactData.contactPoints
    ctx.beginPath()
    ctx.fillStyle = "white"
    circle(ctx, p1.x, p1.y, 5)
    if (clmd[i].contactData.contactNo === 2) circle(ctx, p2.x, p2.y, 5)
    ctx.fill()
    ctx.closePath()
  }
}

function drawVelocity(manager) {
  const query = manager.query("transform", "movable")
  const ctx = manager.getResource("ctx")
  ctx.beginPath()
  ctx.strokeStyle = "cyan"
  query.each((transform, movable) => {
    drawArm(ctx, transform.position, movable.velocity)
  })
  ctx.stroke()
  ctx.closePath()
}

function drawBounds(manager) {
  const query = manager.query('bound')
  const ctx = manager.getResource("ctx")
  ctx.beginPath()
  ctx.lineWidth = 3
  ctx.strokeStyle = "red"
  query.each(bound => {
    const w = (bound.max.x - bound.min.x)
    const h = (bound.max.y - bound.min.y)
    ctx.strokeRect(
      bound.min.x,
      bound.min.y,
      w,
      h
    )
    ctx.closePath()
    ctx.stroke()
  })
}

function drawPosition(manager) {
  const query = manager.query("transform")
  const ctx = manager.getResource("ctx")

  query.each(transform => {
    const position = transform.position
    ctx.beginPath()
    circle(ctx, position.x, position.y, 4)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.closePath()
  })
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2} position
 * @param {Vector2} arm
 */
function drawArm(ctx, position, arm) {
  ctx.moveTo(position.x, position.y)
  ctx.lineTo(
    position.x + arm.x,
    position.y + arm.y
  )
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
 * @property {boolean} [drawCollisionArm=false]
 * @property {boolean} [drawContacts]
 */