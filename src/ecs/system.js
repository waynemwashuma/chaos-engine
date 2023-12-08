import { mixin, Err, Utils } from "../utils/index.js"

/**
 * Updates components assigned to it.
 * 
 * @interface
 */
export class System {
  init() {
    Err.warnOnce("Please override the init method in the system " + this.constructor.name)
  }
  update() {
    Err.warnOnce("Please override the update method in the system " + this.constructor.name)

  }
  add(component) {
    this.objects.push(component)
  }
  remove(component) {
    let index = this.objects.indexOf(component)
    Utils.removeElement(this.objects, index)
  }
  static implement(system) {
    mixin(System,system)
  }
}

/**
 * 
 * @function
 * @name System#add
 * @param {Component} component
 */
/**
 * 
 * @function
 * @name System#remove
 * @param {Component} component
 */
/**
 * 
 * @function
 * @name System#init
 * @param {Manager} manager
 */
/**
 * 
 * @function
 * @name System#update
 * @param {number} dt
 */