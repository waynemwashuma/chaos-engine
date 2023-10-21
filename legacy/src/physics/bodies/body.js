import { Vector } from "../../utils/vector.js"
import { Angle } from "../../utils/degree.js"
import { AABBox } from "../AABB/boundingBox.js"
let r;
class Body {
  index = -1
  _position = new Vector()
  _acceleration = new Vector()
  _velocity = new Vector()
  _rotation = new Angle()
  parent = null
  angVel = new Angle()
  _mass = 1
  inv_mass = 0
  _inertia = 0
  inv_inertia = 0
  restitution = 0.6
  staticFriction = 0.5
  kineticFriction = 0.2
  bounds = new AABBox()
  layer = 1
  allowSleep = true
  sleeping = false
  AABBDetectionOnly = false
  collisionResponse = true
  collisionPenetration = true
  autoUpdateBound = true
  boundPadding = 0
  constructor(position, ...components) {
    this._position.copy(position)
    this.type = this.constructor.name.toLowerCase()
    this.components = components || []
    this.offests = [];
    this.mass = 1
    this.inertia = 1
    this.angle = 0
    for (let i = 0; i < components.length; i++) {
      if (components[i] == undefined)
        continue
      this.offests[i] = {
        position: components[i].position.clone(),
        angle: components[i].angle
      }
    }
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
  set angle(angle) {
    this._rotation.degree = angle
  }
  get angle() {
    return this._rotation.degree
  }
  set mass(x) {
    this._mass = x
    this.inv_mass = x == 0 ? 0 : 1 / x
    this.sleeping = !x ? true : false
    if (x == 0) this.inertia = 0
  }
  get mass() {
    return this._mass
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
  set rotation(r) {
    this._rotation.copy(r)
  }
  get rotation() {
    return this._rotation
  }
  get angularVelocity() {
    return this.angVel.degree
  }
  set angularVelocity(x) {
    this.angVel.degree = x
  }
  applyForce(v) {
    this.acceleration.add(v)
  }
  init(parent) {
    this._position = parent.position
    this._rotation = parent.rotation
    this.bounds = parent.bounds
    this.parent = parent
    this.components.forEach(c => c
      .init(this))
    this.bounds.calculateBounds(this, this.boundPadding)
  }
  update() {
    this.angle = this.angle > 360 ? 360 - this.angle : this.angle < -360 ? 360 + this.angle : this.angle
    this.acceleration.set(0, 0)
    this.updateComponents()

    if (this.bounds) {
      if (this.autoUpdateBound)
        this.bounds.calculateBounds(this, this.boundPadding)
      this.bounds.update(this._position)
    }
  }
  updateComponents() {
    for (var i = 0; i < this.components.length; i++) {
      this.components[i].position.copy(this.position.clone().add(this.offests[i].position))
      this.components[i].angle = this.offests[i].angle + this.angle
      this.components[i].update()
    }
  }
  drawVelocity(ctx) {
    this.velocity.draw(ctx, this.position.x, this.position.y, "cyan")
  }
  draw(ctx, fillStyle, drawNormals) {
    for (var i = 0; i < this.components.length; i++) {
      this.components[i].draw(ctx, fillStyle)
      if (drawNormals)
      this.components[i].drawNormals(ctx)
    }
  }
  removeSelf() {
    this._global.remove(this)
    this._global = null
  }
}
export {
  Body
}