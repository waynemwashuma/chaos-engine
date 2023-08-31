import { Utils } from "../utils/index.js"


/**
 * A helper class.
 * Since there are no interfaces in JavaScript,
 * you might have to extend this to create a component, but there is another solution.
 * Use instead Utils.inheritComponent if you have your own hierarchy of classes.
 * In typescript,this would be an interface.
 * 
 * @interface
 * 
 */
class Component {
  /**
   * @type Entity | null
   */
  entity = null

  destroy() {
    this.entity = null
  }
  /**

   * @param {Entity} entity

  */
  init(entity) {
    this.entity = entity
  }
  /**
   * @param {number} dt
   */
  update(dt) {
    Err.warnOnce("Please override the update function in the component " + proto.constructor.name)

  }
  /**
   * @param {string} n
   */
  get(n) {
    return this.entity.getComponent(n);
  }
  /**
   * @param {...string} names
   */
  requires(...names) {
    for (var i = 0; i < names.length; i++)
      if (!this.entity.has(names[i]))
        Err.throw(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${this.entity.id}`)
  }
  /**
   * @param {CircleBounding | BoxBounding} bound
   * @param {Entity} [target=[]]
   */
  query(bound, target = []) {
    return this.entity.query(bound, target)
  }
}
Utils.inheritComponent(Component)
export {
  Component
}
/**
 * Destroys the component.
 * 
 * @function
 * @name Component#destroy
 */
/**
 * Initializes a component.
 * 
 * @function
 * @name Component#init
 * @param {Entity} entity
 */
/**
 * Updates a component.Called by the system which manages its type.
 * 
 * @function
 * @name Component#update
 * @param {number} dt
 */
/**
 * Gets a component in the entity containing this entity.
 * 
 * @function
 * @name Component#requires
 * @param {string} ...names
 * @throws Qhen a named component isnt in the parent entity
 */