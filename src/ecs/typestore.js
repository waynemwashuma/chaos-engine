export class ComponentHooks {
  /**@type {ComponentHook | null}*/
  add = null
  /**@type {ComponentHook | null}*/
  remove = null
}

export class ComponentInfo {
  /**
   * @readonly
   * @type {ComponentId}
   */
  id = 0
  /**
   * @readonly
   * @type {ComponentName}
   */
  name
  /**
   * @param {ComponentId} id
   * @param {Function} creator
   */
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

export class TypeStore {
  /**
   * @type {Map<string,ComponentId>}
   */
  map = new Map()
  /**
   * @type {Array<ComponentInfo>}
   */
  list = []
  /**
   * @param {Function} componentClass
   * @return {ComponentId}
   */
  set(componentClass) {
    const id = this.list.length
    const name = componentClass.name.toLowerCase()
    this.map.set(name, id)
    this.list.push(new ComponentInfo(id, name))
    return id
  }
  /**
   * @param {string} name
   * @return {boolean}
   */
  has(name) {
    return this.map.has(name)
  }
  /**
   * @param {string} name
   * @return {ComponentInfo | undefined}
   */
  get(name) {
    const id = this.getId(name)
    if(id == void 0)return undefined
    return this.getById(id)
  }
  /**
   * @param {ComponentId} id
   * @return {ComponentInfo | undefined}
   */
  getById(id) {
    return this.list[id]
  }
  /**
   * @param {string} name
   * @return {ComponentId | undefined}
   */
  getId(name) {
    return this.map.get(name)
  }
}