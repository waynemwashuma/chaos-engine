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