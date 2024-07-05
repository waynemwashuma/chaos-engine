export class ComponentHooks {
  /**@type {ComponentHook | null}*/
  add = null
  /**@type {ComponentHook | null}*/
  remove = null
  /**@type {ComponentHook | null}*/
  insert = null
  /**
   * @param {ComponentHook} add
   * @param {ComponentHook} remove
   * @param {ComponentHook} insert
   */
  constructor(add, remove, insert) {
    this.add = add
    this.remove = remove
    this.insert = insert
  }
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
   * @private
   * @type {ComponentHooks}
   */
  hooks = new ComponentHooks()
  /**
   * @param {ComponentId} id
   * @param {Function} creator
   */
  constructor(id, name) {
    this.id = id
    this.name = name
  }
  /**
   * @returns {ComponentHooks}
   */
  getHooks() {
    return this.hooks
  }
  /**
   * @param {ComponentHooks} hooks
   */
  setHooks(hooks) {
    this.hooks = hooks
  }
}