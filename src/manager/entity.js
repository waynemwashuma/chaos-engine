import { Vector, Angle } from "../math/index.js"
import { Body, BoundingBox } from "../physics/index.js"
import { Movable } from "./movableComponent.js"
import { Transform } from "./transformComponent.js"
import { Bound } from "./boundsComponent.js"

/**
 * This is a container to hold components,tags and event handlers.
 * 
 * @class
 * @public
 */
class Entity {
  /**
   * Dictionary of component to manage.
   * 
   * @private
   * @type Object<string,Component>
   */
  _components = {}
  /**
   * Dictionary of handlers to call during an event.
   * 
   * @private
   * @type Object<string,function>
   */
  _handlers = {}
  /**
   * A list of tags to identify an entity.
   * 
   * @private
   * @type Set<string>
   */
  _tags = new Set()
  /**
   * The manager handling this entity.
   * 
   * @private
   * @type Manager
   */
  _global = null
  /**
   * A flag to show if the entity is added to a manager.
   * 
   * @type {boolean}
   */
  active = false

  get CHAOS_OBJ_TYPE() {
    return "entity"
  }
  get CHAOS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * Removes all components and handlers from an entity while removing it from its manager
   */
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
  /**
   * Removes an entity and its components from its manager whilst retaining its components and handlers
   */
  removeSelf() {
    if (this._global) this._global.remove(this)
    this.active = false
    this._global = null
  }
  /**
   * Removes all components of an entity from its manager but keeps the entity inside the manager.
   * This is an internal function so no need on your part to use it.
   */
  removeComponents() {
    if (this._global === void 0) return
    for (var k in this._components) {
      this._global.removeComponent(k, this._components[k])
    }
  }
  /**
   * Gets the current manager of an entity
   * 
   * @returns {Manager}
   */
  get manager() {
    return this._global
  }
  /**
   * Adds a component into an entity
   * 
   * @param {String} n Name of the component.
   * @param {Component} c The component to add.
   * 
   * @returns {this}
   */
  attach(n, c) {
    this._components[n] = c
    if (this.manager) {
      c.init(this)
      this._global.addComponent(n, c)
    }
    return this
  }
  /**
   * Removes a component from an entity.
   * 
   * @param {String} n Name pf the component
   * @rerurns {this}
   */
  remove(n) {
    this._global.removeComponent(n, this._components[n])
    delete this._components[n]
    return this
  }
  /**
   * Registers a function to handle a named event.
   * 
   * @param {string} n Name of the event
   * @param {function} h The function to be called when an event is fired.
   */
  register(n, h) {
    this._handlers[n] = h
  }
  /**
   * Removes an event handler function of the given name
   * 
   * @param {string} n Name of the event
   */
  unregister(n) {
    if (!(n in this._handlers)) return
    delete this._handlers[n]
  }
  /**
   * Returns an event handler which can be fired during an event
   * 
   * @param {string} n Name of the event
   * @returns {function | undefined}
   */
  getHandler(n) {
    return this._handlers[n]
  }
  /**
   * Returns the named component.
   * 
   * @param {string} n Name of the component.
   * @returns {Component | undefined }
   */
  get(n) {
    return this._components[n]
  }
  /**
   * Used to check if the component exists in an entity
   * 
   * @param {string} n Name of the component.
   * @returns {boolean}
   */
  has(n) {
    return n in this._components
  }
  /**
   * Adds a tag into an entity.
   * 
   * @param {string} n The tag to be added
   */
  addTag(n) {
    this._tags.add(n)
  }
  /**
   * Removes a tag from an entity.
   * 
   * @param {string} n The tag to be added
   */
  removeTag(n) {
    this._tags.delete(n)
  }
  /**
   * Checks if a tag exists in an entity.
   * 
   * @param {string} n The tag to be added
   * @returns {boolean}
   */
  hasTag(n) {
    return this._tags.has(n)
  }
  /**
   * Initializes the components within an entity and marks it as active.
   * It is called by an instance of a game manager so no need to call it manually
   * 
   * @package
   * @param {Manager} global
   */
  init(global) {
    this._global = global
    this.active = true
    for (let k in this._components) {
      this._components[k].init(this)
      global.addComponent(k, this._components[k])
    }
  }
  /**
   * A helper function to create a new Entity with transform,movable and bounds components.
   * 
   * @returns {Entity}
   */
  static Default(x, y, a) {
    return new Entity()
      .attach("transform", new Transform(x, y, a))
      .attach("movable", new Movable())
      .attach("bounds", new Bound())
  }
  /**
   * Search an entity's manager for entities in a given bound.
   * 
   * @param {Bounds} bound the region to search entitities in.
   * @param {Entity[]} [target=[]] An array to store results in.
   * @returns {Entity[]}
   */
  query(bound, target = []) {
    return this._global.query(bound, target)
  }
}
export {
  Entity
}

let e = new Entity()