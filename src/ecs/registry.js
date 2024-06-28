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
  resources = {}
  /**
   * @private
   * @type {TypeStore}
   */
  typestore = new TypeStore()
  /**
   * @private
   * @type {number[]}
   */
  entities = []
  constructor() {
    //Because the type `Entity` is a typedef, not an actual class.
    //@tsignore
    this.typestore.set({
      name: "entity"
    })
  }
  /**
   * @param {any[]} components
   * @returns {ComponentId[] | null}
   */
  getComponentIds(components) {
    const ids = []
    for (let i = 0; i < components.length; i++) {
      const name = components[i].constructor.name.toLowerCase()
      const id = this.typestore.getId(name)

      if (!id) return null
      ids.push(id)
    }
    return ids
  }
  /**
   * @private
   * @param {any[]}components
   * @param {ComponentId[]} ids
   * @param {Entity} entity
   */
  callAddComponentHook(components, ids, entity) {
    for (let i = 0; i < ids.length; i++) {
      const hook = this.typestore.getById(ids[i]).getHooks().add

      if (hook)
        hook(components[i], entity, this)
    }
  }
  /**
   * @private
   * @param {any[]}components
   * @param {ComponentId[]} ids
   * @param {Entity} entity
   */
  callRemoveComponentHook(components, ids, entity) {
    for (let i = 0; i < ids.length; i++) {
      const hook = this.typestore.getById(ids[i]).getHooks().remove

      if (hook)
        hook(components[i], entity, this)
    }
  }
  /**
   * Adds an entity to the registry.
   * 
   * @template {Tuple} T
   * @param {T} components The entity to add
   * @returns {Entity}
   */
  create(components) {
    const entity = this.entities.length
    const ids = this.getComponentIds(components)

    assert(ids, `Cannot insert "${components.map(e=>"`" + e.constructor.name+ "`").join(", ")}" into \`ArchetypeTable\`.Ensure that all of them are registered properly using \`Registry.registerType()\``)

    ids.push(0)
    components.push(entity)

    const [id, index] = this.table.insert(components, ids)

    this.callAddComponentHook(components, ids, entity)
    this.entities[entity] = id
    this.entities[entity + 1] = index
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
    const archid = this.entities[entity]
    const index1 = this.entities[entity + 1]
    const ids = this.getComponentIds(components)
    assert(ids, `Cannot insert "${components.map(e=>"`" + e.constructor.name+ "`").join(", ")}" into \`Registry\`.Ensure that all of them are registered properly using \`Registry.registerType()\``)

    const [idextract, extract] = this.table.extract(archid, index1)
    this.table.remove(archid, index1)
    extract.push(...components)
    idextract.push(...ids)

    const [id, index] = this.table.insert(extract, idextract)
    const swapped = this.table.get(archid, index1, 0)

    this.callAddComponentHook(components, ids, entity)
    this.entities[entity] = id
    this.entities[entity + 1] = index
    if (swapped) this.entities[swapped + 1] = index1
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
    const archid = this.entities[entity]
    const index = this.entities[entity + 1]
    const [extractid, extract] = this.table.extract(archid, index)

    this.callRemoveComponentHook(extract, extractid, entity)
    this.table.remove(archid, index)

    //Because `Entity` is garanteed to be `ComponentId` of 0.
    const swapped = this.table.get(archid, index, 0)

    this.entities[entity] = -1
    this.entities[entity + 1] = -1
    if (swapped) this.entities[swapped + 1] = index
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { string  } compName
   * @returns {T}
   */
  get(entity, compName) {
    const archid = this.entities[entity]
    const index = this.entities[entity + 1]
    const id = this.typestore.getId(compName)
    assert(id, `The component ${compName} is not registered into the \`Registry\`.Use \`Registry.registerType()\` to register it.`)
    return this.table.get(archid, index, id)
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
      const id = this.typestore.getId(name)
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
    return this.resources[name]
  }
  /**
   * @param {string} name
   * @returns {boolean}
   */
  hasResource(name) {
    return !!this.resources[name]
  }
  /**
   * @template T
   * @param {T} resource
   */
  setResource(resource) {
    this.resources[resource.constructor.name.toLowerCase()] = resource
  }
  /**
   * @param {Function} type
   */
  registerType(type) {
    this.typestore.set(type)
  }
  /**
   * @param {string} componentname
   * @param {ComponentHooks} hooks
   */
  setComponentHooks(componentname, hooks) {
    const info = this.typestore.get(componentname)
    assert(info, `The component "${componentname}" has not been registered.Use \`Registry.registerType()\` to add it.`)
    info.setHooks(hooks)
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    this.table.clear()
  }
}