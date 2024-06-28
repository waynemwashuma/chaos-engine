import { ArchetypeTable } from "./tables/index.js"
import { Query } from "./query.js"
import { TypeStore, ComponentInfo } from "./typestore.js"
import { assert } from "../logger/index.js"

export class Registry {
  /**
   * @private
   */
  table = new ArchetypeTable()
  /**
   * @private
   * @type {Record<string,any>}
   */
  _resources = {}
  /**
   * @private
   * @type {TypeStore}
   */
  _typestore = new TypeStore()
  constructor() {
    //Because the type `Entity` is a typedef, not an actual class.
    //@tsignore
    this._typestore.set({
      name: "entity"
    })
    this.table.types = this._typestore
  }
  /**
   * @param {any[]} components
   * @returns {ComponentId[] | null}
   */
  getComponentIds(components) {
    const ids = []
    for (let i = 0; i < components.length; i++) {
      const name = components[i].constructor.name.toLowerCase()
      const id = this._typestore.getId(name)

      if (!id) return null
      ids.push(id)
    }
    return ids
  }
  /**
   * Adds an entity to the registry.
   * 
   * @template {Tuple} T
   * @param {T} components The entity to add
   * @returns {Entity}
   */
  create(components) {
    const ids = this.getComponentIds(components)
    assert(ids, `Cannot insert "${components.map(e=>"`" + e.constructor.name+ "`").join(", ")}" into \`ArchetypeTable\`.Ensure that all of them are registered properly using \`Registry.registerType()\``)
    const entity = this.table.insert(components, ids)
    return entity
  }
  /**
   * Inserts components into an entity.
   * 
   * @template {Tuple} T
   * @param {Entity} entity
   * @param {T} components The entity to add
   * @returns {Entity}
   */
  insert(entity, components) {
    const ids = this.getComponentIds(components)
    assert(ids, `Cannot insert "${components.map(e=>"`" + e.constructor.name+ "`").join(", ")}" into \`ArchetypeTable\`.Ensure that all of them are registered properly using \`Registry.registerType()\``)
    this.table.append(entity, components, ids)
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
    this.table.remove(entity)
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { string  } compName
   * @returns {T}
   */
  get(entity, compName) {
    const id = this._typestore.getId(compName)
    assert(id, `The component ${compName} is not registered into the \`Registry\`.Use \`Registry.registerType()\` to register it.`)
    return this.table.get(entity, compNames)
  }
  /**
   * @template T
   * @param { string[]  } compNames
   * @returns {Query<T>}
   */
  query(compNames) {
    const ids = []
    for (let i = 0; i < compNames.length; i++) {
      const name = compNames[i]
      const id = this._typestore.getId(name)
      assert(id !== undefined, `The component "${name}" has not been registered into the \`Registry\`.Use \`App.registerType()\` or \`Registry.registerType()\`to add it.`)
      ids.push(id)
    }
    const query = new Query(this, ids)
    this.table.query(query)
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
   * @param {string} name
   * @returns {boolean}
   */
  hasResource(name) {
    return !!this._resources[name]
  }
  /**
   * @template T
   * @param {T} resource
   */
  setResource(resource) {
    this._resources[resource.constructor.name.toLowerCase()] = resource
  }
  /**
   * @param {Function} type
   */
  registerType(type) {
    this._typestore.set(type)
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    this.table.clear()
  }
}