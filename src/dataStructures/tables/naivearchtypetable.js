import { Utils } from "../../utils/index.js"

/**
 * @template {Tuple} T
 */
class Archetype {
  /**
   * @type {Map<string,any[]>}
   */
  components = new Map()
  /**
   * @type {string[]}
   */
  keys = []
  constructor() {
    this.components.set("entity", [])
    //this.keys.push("entity")
  }
  /**
   * @param {Entity} entity
   * @param {{[x:string]:any}} components
   */
  insert(entity, components) {
    const entities = this.getComponentLists("entity")

    for (let i = 0; i < components.length; i++) {
      //console.log(components[i].constructor.name.toLowerCase())
      this.components.get(components[i].constructor.name.toLowerCase()).push(components[i])
    }
    entities.push(entity)
    return entities.length - 1
  }
  /**
   * @param {number} index
   * @returns {Entity | undefined}
   */
  remove(index) {
    const entities = this.components.get("entity")
    for (let name in this.keys) {
      Utils.removeElement(
        this.components.get(this.keys[name]),
        index
      )
    }
    Utils.removeElement(entities, index)
    return this.components.get("entity")[index]
  }
  /**
   * @param {number} index
   * @param {string[]} compnames
   */
  get(index, compnames) {
    const comp = []
    for (let i = 0; i < compnames.length; i++) {
      const list = this.getComponentLists(compnames[i])
      comp.push(
        list[index]
      )
    }
    return comp
  }
  /**
   * @param {string} name
   * @param {any[]} list
   */
  setComponentList(name, list) {
    this.components.set(name, list)
    this.keys.push(name)
  }
  /**
   * @param {string} name
   */
  getComponentLists(name) {
    return this.components.get(name)
  }
  /**
   * @param {string} name
   */
  hasComponentList(name) {
    return this.components.has(name)
  }
}
export class NaiveArchTypeTable {
  /**
   * @type {Archetype[]}
   */
  list = []
  /**
   * @type {number[]}
   */
  entities = []
  constructor() {}
  /**
   * @private
   * @param {{[x:string] : any}} comps
   */
  _createArchetype(comps) {
    const archetype = new Archetype()
    for (let i = 0; i < comps.length; i++) {
      archetype.setComponentList(comps[i], [])
    }
    return this.list.push(archetype) - 1
  }
  /**
   * @private
   * @param {Archetype} archetype
   * @param {{[x:string] : any}} comps
   */
  _ArcheTypeHasOnly(archetype, comps) {
    if (comps.length !== archetype.components.size - 1) return false
    for (let i = 0; i < comps.length; i++) {
      if (!archetype.components.has(comps[i])) return false
    }
    return true
  }
  /**
   * @private
   * @param {string[]} comps
   */
  _getArchetype(comps) {
    for (let i = 0; i < this.list.length; i++) {
      if (this._ArcheTypeHasOnly(this.list[i], comps)) {
        return i
      }
    }
    return -1
  }
  /**
   * @private
   * @param {string[]} comps
   */
  _getArchetypes(comps) {
    const filtered = []
    for (let i = 0; i < this.list.length; i++) {
      let hasComponents = true
      for (let j = 0; j < comps.length; j++) {
        if (!this.list[i].hasComponentList(comps[j])) {
          hasComponents = false
          break
        }
      }
      if (hasComponents)
        filtered.push(this.list[i])
    }
    return filtered
  }
  /**
   * @template {Tuple} T
   * @param {T} components
   * @returns {Entity}
   */
  insert(components) {
    const entity = this.entities.length
    //components.entity = entity
    const keys = []
    for (let i = 0; i < components.length; i++) {
      keys.push(components[i].constructor.name.toLowerCase())
    }
    let archindex =
      this._getArchetype(keys)
    archindex = archindex === -1 ? this._createArchetype(keys) : archindex
    const index = this.list[archindex].insert(entity, components)
    this.entities[entity] = archindex
    this.entities[entity + 1] = index

    return entity
  }
  /**
   * @param {Entity} entity
   */
  remove(entity) {
    const archid = this.entities[entity]
    const tableid = this.entities[entity + 1]

    const swapped = this.list[archid].remove(tableid)
    if (swapped)
      this.entities[swapped + 1] = this.entities[entity + 1]
    this.entities[entity] = -1
    this.entities[entity + 1] = -1
  }
  /**
   * @template {Tuple} T
   * @param {Entity} entity
   * @param {string[]} compnames
   * @returns {T | null}
   */
  get(entity, compnames) {
    const archid = this.entities[entity]
    const index = this.entities[entity + 1]
    const archetype = this.list[archid]
    if (!archetype) return null
    if (!checkArchetype(archetype, compnames)) return null
    return archetype.get(index, compnames)
  }
  /**
   * @param {string[]} compnames
   * @param {any[]} out 
   */
  query(compnames, out = []) {
    let archetypes = this._getArchetypes(compnames)
    for (let i = 0; i < compnames.length; i++) {
      out[i] = []
    }
    for (let i = 0; i < compnames.length; i++) {
      for (let j = 0; j < archetypes.length; j++) {
        /** @type {[]}*/
        const bin = archetypes[j].getComponentLists(compnames[i])
        out[i].push(bin)
        /*for (let k = 0; k < bin.length; k++) {
          out[i].push(bin[k])
        }*/
      }
    }
    return out
  }
  clear() {
    this.list = []
  }
}

function checkArchetype(archetype, comps) {
  for (let i = 0; i < comps.length; i++) {
    if (!archetype.components.has(comps[i]))
      return false
  }
  return true
}
export { NaiveArchTypeTable as ArchetypeTable }