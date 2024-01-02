import { Utils, Err } from "../utils/index.js"


/**
 * A helper class.
 * Since there are no interfaces in JavaScript,
 * you might have to extend this to create a component, but there is another solution.
 * Use instead `Component.implement()` if you have your own hierarchy of classes.
 * In typescript,this would be an interface.
 * 
 * @interface
 * 
 */
export class Component {

  destroy() {}
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "component"
  }
  /**
   * @param {Entity} entity
   */
  init(entity) {}
  /**
   * @param {number} dt
   */
  update(dt) {
    Err.warnOnce("Please override the update function in the component " + proto.constructor.name)
  }
  /**
   * @param {Entity} entity
   * @param {string} n
   */
  get(entity, n) {
    return entity.getComponent(n);
  }
  /**
   * @param {Entity} entity
   * @param {...string} names
   * @rheows 
   */
  requires(entity, ...names) {
    for (var i = 0; i < names.length; i++)
      if (!entity.has(names[i]))
        Err.throws(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${entity.id}`)
  }
  /**
   * @param {Entity} entity
   * @param {CircleBounding | BoxBounding} bound
   * @param {Entity[]} [target=[]]
   * @returns {Entity[]}
   */
  query(entity, bound, target = []) {
    return entity.query(bound, target)
  }
  /**
   * @template {System} T
   * @param {*} obj
   * @param {T} system
  */
  fromJson(obj, system) {
    throw "Implement static method fromJson() in your component " + this.CHOAS_CLASSNAME
   
  }
  /**
   * @returns {*}
  */
  toJson() {
    throw "Implement static method toJson() in your component " + this.CHOAS_CLASSNAME
  }
  /**
   * @param {*} component
  */
  static implement(component) {
    Utils.inheritComponent(component)
  }
}