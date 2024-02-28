import { Utils, Err } from "./chaos.module.js"
class Archetype {
  entities = []
  components = new Map()
  keys = []
  constructor(){
    this.components.set("entity",this.entities)
  }
  /**
   * @param {Entity} entity
   * @param {number} index
   */
  insert(entity, index) {
    if (entity.id !== -1)
      return Err.warn("An entity has been added twice into an archetype.\nThe dublicate will be ignored.")
    for (let i = 0; i < this.keys.length; i++) {
      this.components.get(this.keys[i]).push(entity.get(this.keys[i]))
    }
    this.entities.push(entity)
    entity.id = [index, this.entities.length - 1]
  }
  remove(entity) {
    const index = entity.id[1]
    for (let name in entity._components) {
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
      this.entities[index].id[1] = index
    entity.id = [-1, -1]
  }
  get(entity) {
    return this.entities[entity.id[1]]
  }
  setComponentList(name, list) {
    this.components.set(name, list)
    this.keys.push(name)
  }
  getComponentLists(name) {
    return this.components.get(name)
  }
  hasComponentList(name) {
    return this.components.has(name)
  }
}
export class NaiveArchTypeTable {
  list = []
  constructor() {}
  _createArchetype(comps) {
    const archetype = new Archetype()
    for (let i = 0; i < comps.length; i++) {
      archetype.setComponentList(comps[i], [])
    }
    return this.list.push(archetype) - 1
  }
  _ArcheTypeHasOnly(archetype, comps) {
    if (comps.length !== archetype.components.size - 1) return false
    for (let i = 0; i < comps.length; i++) {
      if (!archetype.components.has(comps[i])) return false
    }
    return true
  }
  _getArchetype(comps) {
    for (let i = 0; i < this.list.length; i++) {
      if (this._ArcheTypeHasOnly(this.list[i], comps)) {
        return i
      }
    }
    return -1
  }
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
  insert(entity) {
    const keys = []
    for (let name in entity._components) {
      keys.push(name)
    }
    let index =
      this._getArchetype(keys)
    index = index === -1 ? this._createArchetype(keys) : index
    this.list[index].insert(entity, index)
  }
  remove(entity) {
    const keys = []
    for (let name in entity._components) {
      keys.push(name)
    }
    const t = this._getArchetype(keys)
    t.remove(entity)
  }
  get(entity) {
    if (entity.id === -1) return
    return this.list[entity.id[0]].get(entity)
  }
  query(compnames) {
    let archetypes = this._getArchetypes(compnames)
    let out = {}
    for (let i = 0; i < compnames.length; i++) {
      out[compnames[i]] = []
    }
    for (let i = 0; i < compnames.length; i++) {
      for (let j = 0; j < archetypes.length; j++) {
        const bin = archetypes[j].getComponentLists(compnames[i])
        out[compnames[i]].push(bin)
        /*for (let k = 0; k < bin.length; k++) {
          out[compnames[i]].push(bin[k])
        }*/
      }
    }
    return out
  }
}
export {NaiveArchTypeTable as ArchetypeType}