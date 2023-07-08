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