import { Utils } from "../utils/index.js"


/**
 * Updates components assigned to it.
 * 
 * @interface
*/
export class System{}

Utils.inheritSystem(System)

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