import { Utils } from "../../utils/index.js"
import { assert } from "../../logger/index.js"
// Ensure that the `ComponentId` of `Entity` matches this or havoc will ensue.
const entityid = 0


class Archetype {
  /**
   * @type {Map<ComponentId,any[]>}
   */
  components = new Map()
  constructor() {}
  /**
   * @param {Entity} entity
   * @returns {[ComponentId[],any[]]}
   */
  extract(index) {
    const keys = []
    const components = []
    for (const [key, list] of this.components) {
      keys.push(key)
      components.push(list[index])
    }
    return [keys, components]
  }
}

export class ArchetypeTable {
  /**
   * @private
   * @type {Archetype[]}
   */
  list = []
  /**
   * @type {number[]}
   */
  entities = []
  /**
   * @param {ComponentId[]} comps
   */
  createArchetype(comps) {
    const archetype = new Archetype()
    for (let i = 0; i < comps.length; i++) {
      archetype.components.set(comps[i], [])
    }
    return this.list.push(archetype) - 1
  }
  /**
   * @param {Archetype} archetype
   * @param {ComponentId[]} comps
   */
  archetypeHasOnly(archetype, comps) {
    if (comps.length !== archetype.components.size) return false
    for (let i = 0; i < comps.length; i++) {
      if (!archetype.components.has(comps[i])) return false
    }
    return true
  }
  /**
   * @param {ComponentId[]} comps
   * @returns {ArchetypeId}
   */
  getArchetypeId(comps) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.archetypeHasOnly(this.list[i], comps)) {
        return i
      }
    }
    return -1
  }
  /**
   * @param {ComponentId[]} ids
  */
  resolveArchetypeFor(ids){
    for (let i = 0; i < this.list.length; i++) {
      const hasit = this.archetypeHasOnly(this.list[i],ids)
      if(hasit)return i
    }
    return this.createArchetype(ids)
  }
  /**
   * @private
   * @param {string[]} comps
   * @param {ArchetypeId[]} filtered
   * @returns {ArchetypeId[]}
   */
  getArchetypeIds(comps, filtered) {
    for (let i = 0; i < this.list.length; i++) {
      let hasComponents = true
      for (let j = 0; j < comps.length; j++) {
        if (!this.list[i].components.has(comps[j])) {
          hasComponents = false
          break
        }
      }
      if (hasComponents)
        filtered.push(i)
    }
    return filtered
  }
  /**
   * @template {Tuple} T
   * @param {ArchetypeId} id
   * @param {Entity} entity
   * @param {ComponentId[]} keys
   * @param {T} comps
   */
  insertIntoArchetype(id, entity, keys, components) {
    const archetype = this.list[id]
    const index = archetype.components.get(0).length
    for (let i = 0; i < components.length; i++) {
      archetype.components.get(keys[i]).push(components[i])
    }
    this.entities[entity] = id
    this.entities[entity + 1] = index
  }
  /**
   * @param {ArchetypeId} id
   * @param {number} index
   * @returns {Entity | undefined}
   */
  removeFromArchetype(id, index) {
    const archetype = this.list[id]
    for (const list of archetype.components.values()) {
      Utils.removeElement(list, index)
    }
    return archetype.components.get(0)[index]
  }
  /**
   * @template {Tuple} T
   * @param {T} components
   * @param {ComponentId[]} ids
   * @returns {Entity}
   */
  insert(components, ids) {
    const entity = this.entities.length
    ids.push(0)
    components.push(entity)
    const archid = this.resolveArchetypeFor(ids)
    this.insertIntoArchetype(archid, entity, ids, components)
    return entity
  }
  /**
   * @template {Tuple} T
   * @param {Entity} entity
   * @param {T} components
   * @param {ComponentId[]} ids
   */
  append(entity, components, ids) {
    const archid = this.entities[entity]
    const tableid = this.entities[entity + 1]
    const [keys, extracted] = this.list[archid].extract(tableid)
    this.removeFromArchetype(archid, tableid)
    keys.push(...ids)
    extracted.push(...components)
    const archid2 =
      this.resolveArchetypeFor(keys)

    this.insertIntoArchetype(archid2, entity, keys, extracted)
  }
  /**
   * @param {Entity} entity
   */
  remove(entity) {
    const archid = this.entities[entity]
    const tableid = this.entities[entity + 1]

    const swapped = this.removeFromArchetype(archid, tableid)
    if (swapped)
      this.entities[swapped + 1] = this.entities[entity + 1]
    this.entities[entity] = -1
    this.entities[entity + 1] = -1
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param {ComponentId} compname
   * @returns {T | null}
   */
  get(entity, compname) {
    const archid = this.entities[entity]
    const index = this.entities[entity + 1]
    const archetype = this.list[archid]
    if (!archetype) return null
    if (archetype.components.has(compname)) return null
    return archetype.components.get(compname)[index]
  }
  /**
   * @param {Query} query
   */
  query(query) {
    const { descriptors, components } = query
    const archids = this.getArchetypeIds(query.descriptors, [])
    for (let i = 0; i < archids.length; i++) {
      query.archmapper.set(archids[i], i)
    }
    for (let i = 0; i < query.descriptors.length; i++) {
      for (let j = 0; j < archids.length; j++) {
        /** @type {[]}*/
        const bin = this.list[archids[j]].components.get(query.descriptors[i])
        components[i].push(bin)
      }
    }
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