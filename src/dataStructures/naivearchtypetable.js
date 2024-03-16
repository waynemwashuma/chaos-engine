import { Entity } from "../ecs/entity.js"
import { warn } from "../logger/index.js"
import { Utils } from "../utils/index.js"


class Archetype {
  /**
   * @type {Entity[]}
   */
  entities = []
  /**
   * @type {Map<string,any>}
   */
  components = new Map()
  /**
   * @type {string[]}
   */
  keys = []
  constructor() {
    this.components.set("entity",this.entities)
  }
  /**
   * @param {Entity} entity
   * @param {{[x:string]:any}} components
   */
  insert(entity,components) {
    if (entity.index !== -1)
      return warn("An entity has been added twice into an archetype.\nThe dublicate will be ignored.")
    for (let i = 0; i < this.keys.length; i++) {
      this.components.get(this.keys[i]).push(components[this.keys[i]])
    }
    this.entities.push(entity)
    entity.index = this.entities.length - 1
    return this.entities.length - 1
  }
  /**
   * @param {Entity} entity
   */
  remove(entity) {
    const index = entity.index
    for (let name in this.keys) {
      Utils.removeElement(
        this.components.get(name),
        index
      )
    }
    Utils.removeElement(
      this.entities,
      index
    )
    if (index !== this.entities.length)
      this.entities[index].index = index
    entity.index = -1
  }
  /**
   * @param {Entity} entity
   * @param {{[x:string] : any}} compnames
   */
  get(entity,compnames) {
    const comp = []
    for (let i = 0; i < compnames.length; i++) {
      const list = this.getComponentLists(compnames[i])
      if (list == void 0) {
        comp.push(null)
        continue
      }
      comp.push(
        list[entity.index]
      )
    }
    return comp
  }
  /**
   * @param {string} name
   * @param {any[]} list
   */
  setComponentList(name,list) {
    this.components.set(name,list)
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
  constructor() { }
  /**
   * @private
   * @param {{[x:string] : any}} comps
   */
  _createArchetype(comps) {
    const archetype = new Archetype()
    for (let i = 0; i < comps.length; i++) {
      archetype.setComponentList(comps[i],[])
    }
    return this.list.push(archetype) - 1
  }
  /**
   * @private
   * @param {Archetype} archetype
   * @param {{[x:string] : any}} comps
   */
  _ArcheTypeHasOnly(archetype,comps) {
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
      if (this._ArcheTypeHasOnly(this.list[i],comps)) {
        return i
      }
    }
    return -1
  }
  /**
   * @private
   * @param {string | any[]} comps
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
   * @param {Entity} entity
   * @param {{[x:string] : any}} components
   */
  insert(entity,components) {
    const keys = []
    for (let name in components) {
      keys.push(name)
    }
    let index =
      this._getArchetype(keys)
    index = index === -1 ? this._createArchetype(keys) : index
    this.list[index].insert(entity,components)
    entity.archIndex = index
  }
  /**
   * @param {Entity} entity
   */
  remove(entity) {
    this.list[entity.archIndex].remove(entity)
  }
  /**
   * @param {Entity} entity
   * @param {string[]} compnames
   */
  get(entity,compnames) {
    if (entity.index === -1) return
    return this.list[entity.archIndex].get(entity,compnames)
  }
  /**
   * @param {string[]} compnames
   * @param {any[]} out 
   */
  query(compnames,out = []) {
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
export { NaiveArchTypeTable as ArchetypeTable }