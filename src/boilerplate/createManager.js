import { deprecate, throws } from "../logger/index.js"
/**
 * Creates a new instance of Manager class with given default systems.
 * 
 * @param {Object} [options] 
 * @param {boolean} [options.autoPlay=true] Whether the manager should immediately start playing after initialization
 * @param {boolean} [options.physics=true] Adds physics world as a System.
 * @param {boolean} [options.renderer=true] Adds a renderer as a system.
 * @param {boolean} [options.input=true] Adds input as a system.
 * 
 **/
export function createManager(options) {
  deprecate("createManager()","Manager()")
  throws("Breaking deprecation encountered")
}