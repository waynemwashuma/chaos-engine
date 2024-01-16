import { mixin, Utils } from "../utils/index.js"
import { Logger } from "../logger/index.js"

/**
 * Updates components assigned to it.
 */
export class System {
  /**
   * @param {Manager} manager
   */
  init(manager) {
    Logger.warnOnce("Please ovLoggeride the init method in the system " + this.constructor.name)
  }
  /**
   * @param {number} dt
   */
  update(dt) {
    Logger.warnOnce("Please ovLoggeride the update method in the system " + this.constructor.name)
  }
  /**
   * @param {Component} component
   */
  add(component) {
    this.objects.push(component)
  }
  /**
   * @param {Component} component
   */
  remove(component) {
    let index = this.objects.indexOf(component)
    Utils.removeElement(this.objects, index)
  }
  //Todo - Fix this
  /**
   * @param {any} system
   */
  static implement(system) {
    mixin(System, system)
  }
}