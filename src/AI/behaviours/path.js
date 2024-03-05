import { Behaviour } from "./behaviour.js"
import { Vector2, map } from "../../math/index.js"
import { circle, fill, stroke } from "../../render/index.js"
const tmp1 = new Vector2()
const tmp2 = new Vector2()
/**
 * Creates a behaviour that follows a certain path.
 * 
 * @augments Behaviour
 */
export class PathFollowing extends Behaviour {
  /**
   * The path taken by a pathfollowing behaviour.
   * 
   * @type {Path}
   */
  path = null
  /**
   * @param {Path} path
   */
  constructor(path) {
    super()
    this.path = path
    path.speed = this.maxSpeed
  }
  /**
   * @inheritdoc
   * @param { Vector2 } target
   * @param {number} inv_dt
   * @returns {Vector2} the first parameter
   */
  calc(target, inv_dt) {
    tmp1.copy(this.position)
    let [p1, p2] = this.path.current()
    tmp2.copy(p2).sub(p1).normalize()

    let proj = tmp2.dot(tmp1.sub(p1))
    let projPoint = this.path.update(proj)
    tmp1.copy(projPoint).sub(this.position)
    let length = tmp1.magnitude()
    if (length < this.velocity.magnitude()) {
      tmp1.setMagnitude(map(length, 0, this.maxSpeed, 0, this.maxSpeed))
    }
    let steering = tmp1.sub(this.velocity).multiply(inv_dt)

    steering.clamp(0, this.maxForce)
    target.add(steering)

    return target
  }
  /**
   * Removes all points on the path.
   */
  clear() {
    this.path.clear()
  }
  /**
   * @inheritdoc
   * @param {Agent} agent
   */
  init(agent) {
    this.position = agent.position
    this.velocity = agent.velocity
  }
  /**
   * Adds a point into the path.
   * 
   * @param { Vector2} point
   */
  add(point) {
    this.path.add(point)
  }
  /**
   * If the agent should start at the beginning after reaching the ent of the path.
   * 
   * @type boolean
   */
  set loop(x) {
    this.path.loop = x
  }
  get loop() {
    return this.path.loop
  }
  /**
   * Sets a new path to follow.
   *
   * @param {Path} path
   */
  setPath(path) {
    this.path = path
  }
  draw(ctx) {
    ctx.beginPath()
    circle(ctx, ...this.path.point(), 4)
    fill(ctx, "blue")
    ctx.closePath()
    ctx.beginPath()
    circle(ctx, ...this.path.point(), this.path.tolerance)
    stroke(ctx, "blue")
    ctx.closePath()
    this.path.draw(ctx)
  }
}