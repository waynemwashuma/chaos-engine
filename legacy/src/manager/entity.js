import { Vector } from "../utils/vector.js"
import { Angle } from "../utils/degree.js"
import { Body, AABBox } from "../physics/index.js"
import { BodyMesh } from "../render/index.js"
let r = new Vector()
class Entity {
  _components = {}
  _position = new Vector()
  _rotation = new Angle()
  _handlers = {}
  _global = null
  _bounds = new AABBox()
  constructor(position) {
    this.position = position || Entity.DefaultPosition
    this.body = new Body(this.position)
    this.mesh = new BodyMesh()
    this.type = this.constructor.name.toLowerCase()
  }
  destroy() {
    for (let k in this._components) {
      this._components[k].destroy()
    }
    this._global.remove(this)
    this.parent = null
    this._components = {}
    this._global = null
    this._parent = null
    this._handlers = {}
  }
  removeSelf() {
    this.manager.remove(this)
  }
  registerHandler(n, h) {
    if (!(n in this._handlers)) {
      this._handlers[n] = []
    }
    this._handlers[n].push(h)
  }
  get manager() {
    return this._global
  }
  set parent(x) {
    this._parent = x
  }
  get parent() {
    return this._parent
  }
  get bounds() {
    return this._bounds
  }
  set bounds(x) {
    this.body.bounds = x
    this._bounds = x
  }
  addComponent(n, c) {
    this._components[n] = c
    if (this.manager) c.init(this.manager)
    c.parent = this
  }
  init(global) {
    this._global = global
    for (let k in this._components) {
      this.manager.add(this._components[k])
    }
    if (this.mesh) this.mesh.init(this)
    if (this.body) {
      this.body.init(this)
      this._bounds.calculateBounds(this.body)
    }
  }
  getComponent(n) {
    return this._components[n]
  }
  findEntity(n) {
    return this._global.get(n)
  }
  broadcast(msg) {
    if (!(msg.topic in this._handlers)) {
      return
    }

    for (let curHandler of this._handlers[msg.topic])
      curHandler(msg)
  }
  set position(p) {
    this._position.copy(p)
    this.broadcast({
      topic: 'update.position',
      value: this._position,
    });
  }
  set rotation(r) {
    this._rotation.copy(r)
    this.broadcast({
      topic: 'update.rotation',
      value: this._rotation,
    })
  }
  set velocity(x) {
    this.body.velocity.copy(x)
  }
  set accelaration(x) {
    this.body.accelaration.copy(x)
  }
  get position() {

    return this._position
  }
  get rotation() {
    return this._rotation
  }
  get velocity() {
    return this.body.velocity
  }
  get accelaration() {
    return this.body.accelaration
  }
  update(dt) {
    for (let k in this._components) {
      this._components[k].update(dt)
    }
  }
  set angle(x) {
    this._rotation.degree = x
  }
  get angle() {
    return this._rotation.degree
  }
  set angularVelocity(x) {
    this.body.angularVelocity = x
  }
  get angularVelocity() {
    return this.body.angularVelocity
  }
  onCollision() {}
  static get DefaultPosition() {
    return r
  }
  static set DefaultPosition(x) {
    r.copy(x)
  }
}

export {
  Entity
}