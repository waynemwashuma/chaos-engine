/**
 * This is a container to hold components,tags and event handlers.
 * 
 * @class
 * @public
 */
export class Entity {
  /**
   * @internal
   * @type {number}
  */
  index = -1
  /**
   * @internal
   * @type {number}
   */
  archIndex = -1
  /**
   * @type {string}
   */
  get CHAOS_OBJ_TYPE() {
    return "entity"
  }
  /**
   * @type {string}
   */
  get CHAOS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
}