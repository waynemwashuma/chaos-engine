import { Vector, Utils, Angle, sq } from "../../utils/index.js"
import { Component } from "/src/manager/component.js"
import {AABBox} from "../AABB/index.js"
import { ObjType, Settings } from "../settings.js"

let defaults = new Vector()

/**
 * 
 */
class Body {
  id = Utils.generateID()
  _position = new Vector()
  _velocity = new Vector()
  _acceleration = new Vector()
  _orientation = new Angle()
  _rotation = new Angle()
  bounds = new AABBox()
  _mass = 1
  _inertia = 0
  _type = null
  _localanchors = []
  anchors = []
  lastPosition = new Vector()
  inv_mass = 0
  inv_inertia = 0
  restitution = Settings.restitution
  staticFriction = Settings.staticFriction
  kineticFriction = Settings.kineticFriction
  boundPadding = Settings.boundPadding
  index = -1
  mask = {
    layer: 0,
    group: 0
  }
  entity = null
  bounds = null
  shapes = null
  allowSleep = Settings.allowSleep
  sleeping = false
  aabbDetectionOnly = Settings.aabbDetectionOnly
  collisionResponse = Settings.collisionResponse
  autoUpdateBound = Settings.autoUpdateBound
  constructor(...shapes) {
    this.type = Settings.type
    this.shapes = shapes
    this.mass = 1
    this.inertia = 1
  }
  /**
   * Sets the type of a body.It includes the static and dynamic for now.
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
  /**
   * Gets the type of body.
  */
  get type() {
    return this._type
  }
  get physicsType() {
    return ObjType.BODY
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "body"
  }
  get acceleration() {
    return this._acceleration
  }
  set acceleration(x) {
    this._acceleration.copy(x)
  }
  get velocity() {
    return this._velocity
  }
  set velocity(x) {
    this._velocity.copy(x)
  }
  get rotation() {
    return this._rotation
  }
  set rotation(x) {
    this._rotation.copy(x)
  }

  set angle(angle) {
    this.orientation.degree = angle
  }
  get angle() {
    return this.orientation.degree
  }
  set mass(x) {
    this._mass = x
    this.inv_mass = x === 0 ? 0 : 1 / x
    if (x == 0) this.inertia = 0
  }
  get mass() {
    return this._mass
  }
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
  set inertia(x) {
    this._inertia = x
    this.inv_inertia = x == 0 ? 0 : 1 / x
  }
  get inertia() {
    return this._inertia
  }
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  set orientation(r) {
    this._orientation.copy(r)
  }
  get orientation() {
    return this._orientation
  }
  get angularVelocity() {
    return this.rotation.degree
  }
  set angularVelocity(x) {
    this.rotation.degree = x
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @param {Vector} v The anchor arm
   * @returns {number}
   */
  setAnchor(v) {
    this.anchors.push(new Vector(v.x, v.y).rotate(this.orientation.radian).add(this.position))
    return this._localanchors.push(v) - 1
  }
  /**
   * Gets an anchor in its world coordinate form.
   * Treat the returned value as read-only.
   * 
   * @param {number} index the position of the
   * @returns {Vector}
   */
  getAnchor(index) {
    return this.anchors[index]
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @param {number} index The position of the anchor.
   * @param {Vector} [target=Vector] Vector to store results in.
   * @rerurns {Vector}
   */
  getLocalAnchor(index, target = new Vector()) {
    return target.copy(this._localanchors[index]).rotate(this.orientation.radian)
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * 
   * 
   * @param {number} index The force to be applied.
   * @param {Vector} [arm=Vector] The collision arm.
   */
  applyForce(force, arm = Vector.ZERO) {
    this.acceleration.add(force.multiply(this.inv_mass))
    this.rotation.degree += arm.cross(force) * this.inv_inertia
  }
  
  /**
   * @private
  */
  init(entity,composited = false) {
    this.entity = entity
    if(composited){
      this.bounds = new AABBox()
      this.update()
      return
    }
    this.requires("transform", "movable", "bounds")
    
    let transform = entity.get("transform")
    let bounds = entity.get("bounds")
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
      this.anchors[i].copy(this._localanchors[i]).rotate(this.orientation.radian).add(this.position)
    }
    if (this.autoUpdateBound)
      this.bounds.calculateBounds(this, this.boundPadding)
    this.bounds.update(this.position)
    //this.angle = this.angle > 360 ? this.angle - 360 : this.angle < 0 ? 360 + this.angle : this.angle
  }
  static STATIC = ObjType.STATIC
  static KINEMATIC = ObjType.KINEMATIC
  static DYNAMIC = ObjType.DYNAMIC
}
Utils.inheritComponent(Body,false,false)
export {
  Body
}