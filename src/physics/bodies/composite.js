import { Vector2 } from "../../math/index.js"
import { ObjType } from "../settings.js"

/**
 * Holds a group of related bodies and constraints.
 */
export class Composite {
  /**
   * Entity this belongs to.
   * 
   * @type {Entity | null}
   */
  entity = null
  /**
   * List of bodies contained.
   *
   * @type Body2Dy[]}
   */
  bodies = []
  /**
   * List of bodies contained.
   *
   * @type {Constraint[]}
   */
  constraints = []
  /**
   * Used to determine what it is in a world.
   * 
   * @package
   * @type {number} 
   */
  get physicsType() {
    return ObjType.COMPOSITE
  }
  /**
   * Initializes the body to its given.Called by the world or an entity manager.
   * 
   * @param {Entity | null} entity
   */
  init(entity) {
    this.bodies.forEach(e => {
      e.init(entity, true)
    })
    this.requires(entity, "transform")
  }
  /**
   * @param {Constraint | Body2D} object
   */
  add(object) {
    if (object.physicsType === ObjType.CONSTRAINT)
      return this.constraints.push(object)
    if (object.physicsType === ObjType.BODY)
      this.bodies.push(object)
  }
  /**
   * This updates the world coordinates of shapes, anchors and bounds.
   */
  update() {
    this.lastPosition.copy(this.position)
  }
  /**
   * Acceleration of a body
   * 
   * @type {Vector2}
   */
  get acceleration() {
    let acceleration = new Vector2()
    for (var i = 0; i < this.bodies.length; i++) {
      acceleration.copy(this.bodies[i].acceleration)
    }
    return acceleration.divide(this.bodies.length)
  }
  set acceleration(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].acceleration = x
    }
  }
  /**
   * Velocity of a body
   * 
   * @type {Vector2}
   */
  get velocity() {
    let velocity = new Vector2()

    for (var i = 0; i < this.bodies.length; i++) {
      velocity.add(this.bodies[i].velocity)
    }
    return velocity.divide(this.bodies.length)
  }
  set velocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].velocity.copy(x)
    }
  }
  /**
   * Orientation of a body in degrees.
   * 
   * @type {number}
   */
  get angle() {
    let angle = 0
    for (var i = 0; i < this.bodies.length; i++) {
      angle += this.bodies[i].angle
    }
  }
  set angle(angle) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angle = x
    }
  }

  /**
   * Mass of a body.
   * 
   * @type {number}
   */
  set mass(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].mass = x
    }
  }
  get mass() {
    let mass = 0
    for (var i = 0; i < this.bodies.length; i++) {
      mass += this.bodies[i].mass
    }
    return mass
  }
  set type(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].type = x
    }
  }
  get type() {
    return this.bodies[0]?.type
  }
  /**
   * Density of a body.
   * 
   * @type {number}
   */
  set density(x) {
    let area = 0
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].density = x
    }
  }
  get density() {
    let density = 0
    for (var i = 0; i < this.bodies.length; i++) {
      density += this.bodies[i].density
    }
    return density / this.bodies.length
  }
  /**
   * Position of a body
   * 
   * @type {Vector2}
   */
  get position() {
    let position = new Vector2()
    for (var i = 0; i < this.bodies.length; i++) {
      position.add(this.bodies[i].position)
    }
    return position
  }
  set position(x) {
    let dp = x.clone().sub(this.position)
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].position.add(dp)
    }
  }
  /**
   * Orientation of a body
   * 
   * @type {Angle}
   */
  set orientation(r) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].orientation.copy(r)
    }
  }
  get orientation() {
    let ang = 0
    for (var i = 0; i < this.bodies.length; i++) {
      ang += this.bodies[i].orientation
    }
    return ang / this.bodies.length
  }
  /**
   * Angular velocity of a body.
   * 
   * @type {number}
   */
  get angularVelocity() {
    let ang = 0
    for (var i = 0; i < this.bodies.length; i++) {
      ang += this.bodies[i].angularVelocity
    }
    return ang / this.bodies.length
  }
  set angularVelocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angularVelocity = x
    }
  }
  destroy() {
    this.bodies.forEach(b => {
      b.destroy()
    })
  }
}