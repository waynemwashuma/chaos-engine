import { Utils } from "../utils/index.js"


/**
 * A helper class.
 * Since there are no inerfaces in JavaScript,
 * you might have to extend this to create a component, but there is another solution.
 * Use instead Utils.inheritComponent if you have your own hierarchy of classes.
*/
class Component {
  /**
   * The entity this component belongs to.
  */
  entity = null
}
Utils.inheritComponent(Component)
export {
  Component
}