import { Behaviour } from "./behaviour.js"
import { Vector, clamp, map } from "../../math/index.js"

const tmp1 = new Vector()
const tmp2 = new Vector()
const tmp3 = new Vector()
/**
 * Creates a behaviour that follows a certain path.
 * 
 * @augments Behaviour
*/
export class PathFollowing extends Behaviour {
  /**
   * The path taken by a pathfollowing behaviour.
   * 
   * @type Path
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
   * @param {Vector} target
   * @param {number} inv_dt
   * @returns Vector the first parameter
   */
  calc(target, inv_dt) {
    tmp1.copy(this.position)
    let [p1, p2] = this.path.current()
    let dist = tmp2.copy(p2).sub(p1).magnitude()
    tmp2.normalize()

    let proj = tmp2.dot(tmp1.sub(p1))
    let dir = tmp3.copy(tmp2).multiply(proj)
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
   * @param {Vector} point
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
  draw(renderer) {
    renderer.begin()
    renderer.circle(...this.path.point(), 4)
    renderer.fill("blue")
    renderer.close()
    renderer.begin()
    renderer.circle(...this.path.point(), this.path.tolerance)
    renderer.stroke("blue")
    renderer.close()
    this.path.draw(renderer)
  }
}