export class ComponentInfo {
  /**
   * @readonly
   * @type {ComponentId}
   */
  id = 0
  /**
   * @readonly
   * @type {string}
   */
  name
  /**
   * @param {ComponentId} id
   * @param {Function} creator
   */
  constructor(id,name) {
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
   */
  get(name) {
    return this.getById(this.getId(name))
  }
  /**
   * @param {number} id
   */
  getById(id) {
    return this.list[id]
  }
  /**
   * @param {string} name
   */
  getId(name) {
    return this.map.get(name)
  }
}