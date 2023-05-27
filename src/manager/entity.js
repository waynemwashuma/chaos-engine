import { Vector, Angle } from "../utils/index.js"
import { Body, AABBox } from "../physics/index.js"
import { BodyMesh } from "../render/index.js"
import { Transform, Movable } from "/src/index.js"

class Entity {
  _components = {}
  _global = null
  _handlers = {}
  _tags = new Set()
  active = false
  get CHAOS_OBJ_TYPE() {
    return "entity"
  }
  get CHAOS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  destroy() {
    this.removeSelf()
    for (let k in this._components) {
      let comp = this._components[k]
      if (comp.destroy)
        comp.destroy()
      delete this._components[k]
    }
    for (let k in this._handlers) {
      delete this._handlers[k]
    }

  }
  removeSelf() {
    if (this._global) this._global.remove(this)
    this.active = false
    this._global = null
  }
  removeComponents() {
    if (this._global === void 0) return
    for (var k in this._components) {
      this._global.removeComponent(k, this._components[k])
    }
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
  attach(n, c) {
    this._components[n] = c
    if (this.manager) {
      c.init(this)
      this._global.addComponent(n, c)
    }
    return this
  }
  remove(n) {
    this._global.removeComponent(n, this._components[n])
    delete this._components[n]
  }
  register(n, h) {
    this._handlers[n] = h
  }
  unregister(n) {
    if (!(n in this._handlers)) return
    delete this._handlers[n]
  }
  getHandler(n) {
    return this._handlers[n]
  }
  get(n) {
    return this._components[n]
  }
  has(n) {
    return n in this._components
  }
  addTag(n) {
    this._tags.add(n)
  }
  removeTag(n) {
    this._tags.delete(n)
  }
  hasTag(n) {
    return this._tags.has(n)
  }
  init(global) {
    this._global = global
    this.active = true
    for (let k in this._components) {
      this._components[k].init(this)
      global.addComponent(k, this._components[k])
    }
  }

  update(dt) {
    for (let k in this._components) {
      if (k == "mesh" || k == "body") continue
      this._components[k].update(dt)
    }
  }
  static DefaultPosition = new Vector()
  static Default(x, y, a) {
    return new Entity()
      .attach("transform", new Transform(x, y, a))
      .attach("movable", new Movable())
      .attach("bounds", new AABBox())
  }
  query(bound, target = []) {
    return this._global.query(bound, target)
  }
}

export {
  Entity
}