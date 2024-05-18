import { ArchetypeTable } from "./tables/index.js"
import { EventDispatcher } from "../events/index.js"
import { Query } from "./query.js"

export class Registry {
  /**
   * @private
   */
  _table = new ArchetypeTable()
  /**
   * @private
   * @type {Record<string,any>}
   */
  _resources = {}
  events = new EventDispatcher()
  /**
   * Adds an entity to the manager and initializes it.
   * @template {Tuple} T
   * @param {T} components The entity to add
   */
  create(components) {
    const entity = this._table.insert(components)
    this.events.trigger("add",entity)
    return entity
  }
  /**
   * @template {Tuple} T
   * @param {T[]} entities
   */
  createMany(entities) {
    for (let i = 0; i < entities.length; i++) {
      this.create(entities[i])
    }
  }
  /**
   * Removes an entity from the registry.
   * Note that this doesn't destroy the entity, only removes it and its components from the manager.
   * To destroy the entity,use `Entity.destroy()` method.
   * 
   * @param {Entity} entity The entity to remove
   */
  remove(entity) {
    this.events.trigger("remove",entity)
    this._table.remove(entity)
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { string[]  } compNames
   * @returns {T}
   */
  get(entity, ...compNames) {
    // @ts-ignore
    return this._table.get(entity, compNames)
  }
  /**
   * @template T
   * @param { string[]  } compNames
   * @returns {Query<T>}
   */
  query(compNames) {
    //TODO - Maybe cache the query?
    const query = new Query(this,compNames)
    this._table.query(query)
    return query
  }
  /**
   * @template T
   * @param {string} name
   * @returns {T}
   */
  getResource(name) {
    return this._resources[name]
  }
  /**
   * @template T
   * @param {T} resource
   */
  setResource(resource) {
    this._resources[resource.constructor.name.toLowerCase()] = resource
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    this.events.trigger("clear", this)
    this._table.clear()
  }
  update() {
    const systems = this._systems;
    for (let i = 0; i < systems.length; i++) {
      systems[i](this);
    }
  }
}