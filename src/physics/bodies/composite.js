import { Vector } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { ObjType } from "../settings.js"

/**
 * Holds a group of related bodies and constraints.
 */
class Composite {
  /**
   * Entity this belongs to.
   * 
   * @type Entity | null
   */
  entity = null
  /**
   * List of bodies contained.
   *
   * @type Body[]
   */
  bodies = []
  /**
   * List of bodies contained.
   *
   * @type Constraint[]
   */
  constraints = []
  /**
   * Used to determine what it is in a world.
   * 
   * @package
   * @type number 
   */
  get physicsType() {
    return ObjType.COMPOSITE
  }
  /**
   * Initializes the body to its given.Called by the world or an entity manager.
   * 
   * @param {Entity | null} entity
   * @param {boolean} composited
   */
  init(entity) {
    this.bodies.forEach(e => {
      e.init(entity, true)
    })
    this.requires("transform")

  }
  /**
   * @param {Constraint | Body} object
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
   * @type Vector
   */
  get acceleration() {
    let acceleration = new Vector()
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
   * @type Vector
   */
  get velocity() {
    let velocity = new Vector()

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
     * @type number
     */
  set angle(angle) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angle = x
    }
  }
  get angle() {
    let angle = 0
    for (var i = 0; i < this.bodies.length; i++) {
      angle += this.bodies[i].angle
    }
  }
    /**
     * Mass of a body.
     * 
     * @type number
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
    /**
     * Density of a body.
     * 
     * @type number
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
   * @type Vector
   */
  get position() {
    let position = new Vector()
    for (var i = 0; i < this.shapes.length; i++) {
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
   * @type Angle
   */
  set orientation(r) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].orientation.copy(r)
    }
  }
    /**
     * Angular velocity of a body.
     * 
     * @type number
     */
  get angularVelocity() {
    let ang = 0
    for (var i = 0; i < this.bodies.length; i++) {
      ang += this.bodies[i].angularVelocity
    }
    return ang
  }
  set angularVelocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angularVelocity = x
    }
  }
}
Utils.inheritComponent(Composite)
export {
  Composite
}