import { Vector2, Angle } from "../../math/index.js"
import { Component } from "../../ecs/index.js"
import {Utils} from "../../utils/index.js"
import { BoundingBox } from "../AABB/index.js"
import { ObjType, Settings } from "../settings.js"
import { Shape } from "../shapes/index.js"

/**
 * Holds information needed for collision detection and response.
 * 
 */
export class Body extends Component{
  /**
   * Unique identification of a body.
   * 
   * @type number
   */
  id = Utils.generateID()
  /**
   * World space coordinates of a body
   * 
   * @private
   * @type Vector2
   */
  _position = new Vector2()
  /**
   * velocity of a body.Speed in pixels per second.
   * 
   * @private
   * @type Vector2
   */
  _velocity = new Vector2()
  /**
   * acceleration of a body in pixels per second squared.
   * 
   * @private
   * @type Vector2
   */
  _acceleration = new Vector2()
  /**
   * World space orientation of a body
   * 
   * @private
   * @type Angle
   */
  _orientation = new Angle()
  /**
   * Rotation of a body
   * 
   * @private
   * @type Angle
   */
  _rotation = new Angle()
  /**
   * Torque of the body
   * 
   * @private
   * @type Angle
   */
  _torque = new Angle()
  /**
   * Mass of the body.
   * 
   * @private
   * @type number
   * @default 1
   */
  _mass = 1
  /**
   * Rotational inertia of the body.
   * 
   * @private
   * @type number
   */
  _inertia = 1
  /**
   * Type of the body e.g Dynamic, Kinematic or Static.
   * 
   * @private
   * @type number
   */
  _type = 0
  /**
   * Anchors of the body in local space.
   * 
   * @private
   * @type Vector2[]
   */
  _localanchors = []
  /**
   * The original anchors of the body in local space.
   * 
   * @private
   * @type Vector2[]
   */
  anchors = []
  /**
   * Position of a body in the last frame..
   * 
   * @type Vector2
   */
  lastPosition = new Vector2()
  /**
   * Inverse mass of the body.
   * 
   * @type number
   */
  inv_mass = 0
  /**
   * Inverse inertia of the body.
   * 
   * @type number
   */
  inv_inertia = 0
  /**
   * The bounciness of the body between 0 and 1.
   * 
   * @type number
   * @default Settings.restitution
   */
  restitution = Settings.restitution
  /**
   * The friction of the body between 0 and 1 that affects it before it moves.
   * 
   * @type number
   * @default Settings.staticFriction
   */
  staticFriction = Settings.staticFriction
  /**
   * The friction of the body between 0 and 1that affects it after it moves.
   * 
   * @type number
   * @default Settings.kineticFriction
   */
  kineticFriction = Settings.kineticFriction
  /**
   * The padding of the body's bounds.
   * 
   * @type number
   * @default Settings.boundPadding
   */
  boundPadding = Settings.boundPadding
  /**
   * The index of the body in its manager.
   * 
   * @package
   * @type number
   * @default -1
   */
  index = -1
  /**
   * Used to describe how bodies will collide with each other.
   * Bodies in the same layer or layer 0 will always collide with each other unless they are in different groups.
   * Bodies in the same group will not collied with each other.
   * 
   * @type {{layer:number, group: number}}
   * @default -1
   */
  mask = {
    layer: 0,
    group: 0
  }
  /**
   * Object containing the body
   * 
   * @type Entity | null
   */
  entity = null
  /**
   * World space bounds of a body.
   * 
   * @type BoundingBox | BoundingCircle | null
   */
  bounds = null
  /**
   * Shapes a body is comprised of.
   * 
   * @type Shape[]
   */
  shapes = null
  /**
   * Client of the body inside a broadphase.
   * 
   * @package
   * @type Object | null
   */
  client = null
  /**
   * Whether the body should sleep when at rest or not.
   * 
   * @type boolean
   * @default Settings.allowSleep
   */
  allowSleep = Settings.allowSleep
  /**
   * If the body is asleep or not.
   * 
   * @type boolean
   */
  sleeping = false
  /**
   * Whether the body should detect collisions with bounds only.If true,no collision response will occur.Precollision event only will be fired.
   * 
   * @type boolean
   * @default Settings.aabbDetectionOnly
   */
  aabbDetectionOnly = Settings.aabbDetectionOnly
  /**
   * Whether the body should respond to collisions.If false,no collision response will occur but collision events will still be fired.
   * 
   * @type boolean
   * @default Settings.collisionResponse
   */
  collisionResponse = Settings.collisionResponse
  /**
   * Whether or not the bounds should be automatically updated.
   * 
   * @type boolean
   * @default Settings.autoUpdateBound
   */
  autoUpdateBound = Settings.autoUpdateBound
  /**
   * @param {Shape[]} shapes
   */
  constructor(...shapes) {
    super()
    this.type = Settings.type
    this.shapes = shapes
    this.mass = 1
    this.inertia = 1
  }
  /**
   * Type of a body.It includes the static and dynamic for now.
   * Static bodies do not move and do not react to collisions.
   * Dynamic bodies move and respond to collisions.
   * Kinematic bodies move but do not respond to collisions.
   * 
   * @example
   * let body = new Body()
   * body.type = Body.STATIC
   * 
   */
  set type(x) {
    if (x === Body.STATIC || x === Body.KINEMATIC) this.mass = 0
    this._type = x
  }
  get type() {
    return this._type
  }
  /**
   * Used to determine what it is in a world.
   * 
   * @package
   * @type number 
   */
  get physicsType() {
    return ObjType.BODY
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "body"
  }
  /**
   * Acceleration of a body
   * 
   * @type Vector2
   */
  get acceleration() {
    return this._acceleration
  }
  set acceleration(x) {
    this._acceleration.copy(x)
  }
  /**
   * Velocity of a body
   * 
   * @type Vector2
   */
  get velocity() {
    return this._velocity
  }
  set velocity(x) {
    this._velocity.copy(x)
  }
  /**
   * Rotation of a body
   * 
   * @type Angle
   */
  get rotation() {
    return this._rotation
  }
  set rotation(x) {
    this._rotation.copy(x)
  }
  /**
   * Orientation of a body in degrees.
   * 
   * @type number
   */
  set angle(angle) {
    this.orientation.degree = angle
  }
  get angle() {
    return this.orientation.degree
  }
  /**
   * Mass of a body.
   * 
   * @type number
   */
  set mass(x) {
    this._mass = x
    this.inv_mass = x === 0 ? 0 : 1 / x
    if (x == 0) this.inertia = 0
  }
  get mass() {
    return this._mass
  }
  /**
   * Density of a body.
   *
   * @type number
   */
  set density(x) {
    let area = 0
    for (var i = 0; i < this.shapes.length; i++) {
      area += this.shapes[i].area
    }
    this.mass = x * area * 0.01
  }
  get density() {
    let area = 0
    for (var i = 0; i < this.shapes.length; i++) {
      area += this.shapes[i].area
    }
    return 100 * this.mass / area
  }
  /**
   * Rotational inertia of a body.
   * 
   * @type number
   */
  set inertia(x) {
    this._inertia = x
    this.inv_inertia = x == 0 ? 0 : 1 / x
  }
  get inertia() {
    return this._inertia
  }
  /**
   * World space position of a body
   * 
   * @type Vector2
   */
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  /**
   * Orientation of a body
   * 
   * @type Angle
   */
  set orientation(r) {
    this._orientation.copy(r)
  }
  get orientation() {
    return this._orientation
  }
  /**
   * Angular velocity of a body in degrees
   * 
   * @type number 
   */
  get angularVelocity() {
    return this.rotation.degree
  }
  set angularVelocity(x) {
    this.rotation.degree = x
  }
  /**
   * Torque of a body in degrees
   * 
   * @type number 
   */
  get torque() {
    return this._torque
  }
  set torque(x) {
    this._torque.degree = x.degree
  }
  /**
   * Angular acceleration of a body in degrees
   * 
   * @type number 
   */
  get angularAcceleration() {
    return this._torque.degree
  }
  set angularAcceleration(x) {
    this._torque.degree = x
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @param { Vector2} v The anchor arm
   * @returns {number}
   */
  setAnchor(v) {
    this.anchors.push(new Vector2(v.x, v.y).rotate(this.orientation.radian).add(this.position))
    return this._localanchors.push(v) - 1
  }
  /**
   * Gets an anchor in its local space coordinate form.
   * Treat the returned value as read-only.
   * 
   * @param {number} index the position of the
   * @returns { Vector2}
   */
  getAnchor(index) {
    return this.anchors[index]
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @param {number} index The position of the anchor.
   * @param { Vector2} [target= Vector2] Vector2 to store results in.
   * @returns { Vector2}
   */
  getLocalAnchor(index, target = new Vector2()) {
    return target.copy(this._localanchors[index]).rotate(this.orientation.radian)
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * 
   * 
   * @param { Vector2} force The force to be applied.
   * @param { Vector2} [arm= Vector2] The collision arm.
   */
  applyForce(force, arm = Vector2.ZERO) {
    this.acceleration.add(force.multiply(this.inv_mass))
    this.rotation.degree += arm.cross(force) * this.inv_inertia
  }

  /**
   * Initializes the body to its given.Called by the world or an entity manager.
   * 
   * @param {Entity | null} entity
   * @param {boolean} [composited=false]
   */
  init(entity, composited = false) {
    this.entity = entity
    if (composited) {
      this.bounds = new BoundingBox()
      this.update()
      return
    }
    this.requires(entity,"transform", "movable", "bounds")

    let transform = entity.get("transform")
    let bounds = entity.get("bounds").bounds
    let move = entity.get("movable")
    this._acceleration = move.acceleration
    this._rotation = move.rotation
    this._velocity = move.velocity
    this._position = transform.position
    this._orientation = transform.orientation
    this.bounds = bounds

    this.update()
  }

  /**
   * This updates the world coordinates of shapes, anchors and bounds.
   */
  update() {
    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].update(this.position, this._orientation.radian)
    }
    for (var i = 0; i < this.anchors.length; i++) {
      this.anchors[i].copy(this._localanchors[i]).rotate(this.orientation.radian) //.add(this.position)
    }
    if (this.autoUpdateBound)
      this.bounds.calculateBounds(this, this.boundPadding)
    this.bounds.update(this.position)
    //this.angle = this.angle > 360 ? this.angle - 360 : this.angle < 0 ? 360 + this.angle : this.angle
  }
  toJson() {
    let obj = {
      id: this.id,
      position: this.position.toJson(),
      velocity: this.velocity.toJson(),
      acceleration: this.acceleration.toJson(),
      orientation: this.orientation.toJson(),
      rotation: this.rotation.toJson(),
      shapes: [],
      anchors: [],
      collisionResponse: this.collisionResponse,
      allowSleep: this.allowSleep,
      type: this.CHAOS_OBJ_TYPE,
      phyType: this.type,
      mass: this.mass,
      inertia: this.inertia,
      autoUpdateBound: this.autoUpdateBound,
      boundPadding: this.boundPadding,
      aabbDetectionOnly: this.aabbDetectionOnly,
      mask: this.mask
    }
    this.anchors.forEach((a) => {
      obj.anchors.push(a)
    })
    this.shapes.forEach((a) => {
      obj.shapes.push(a.toJson())
    })
    return obj
  }
  //TODO  - Add way to add shapes to body
  fromJson(obj) {
    let shapes = []
    obj.shapes.forEach((shape) => {
      shapes.push(Shape.fromJson(shape))
    })
    let body = this
    body.shapes = shapes
    body.acceleration = obj.acceleration
    body.velocity = obj.velocity
    body.position = pbj.position
    body.rotation = obj.rotation
    body.orientation = obj.orientation
    body.mass = obj.mass
    body.inertia = obj.inertia
    body.type = obj.phyType
    body.allowSleep = obj.allowSleep
    body.aabbDetectionOnly = obj.aabbDetectionOnly
    body.collisionResponse = obj.collisionResponse
    body.autoUpdateBound = obj.autoUpdateBound
    body.id = obj.id
    body.mask = obj.mask
    obj.anchors.forEach((v) => {
      body.setAnchor(new Vector2().fromJson(v))
    })
  }
  /**
   *Body type that dictates a body cannot move nor respond to collisions.
   * 
   * @static
   * @type number*/
  static STATIC = ObjType.STATIC
  /**
   * Body type that dictates a body can move but not respond to collisions.
   * 
   * @static
   * @type number
   */
  static KINEMATIC = ObjType.KINEMATIC
  /**
   * Body type that dictates a body can move and respond to collisions.
   * 
   * @static
   * @type number
   */
  static DYNAMIC = ObjType.DYNAMIC
}