import { World } from "../physics/index.js"
import { Renderer2D } from "../render/index.js"
import {
  defaultCollisionHandler,
  defaultPrecollisionHandler
} from "../events/index.js"
/**
 * Creates a new instance of Manager class with given default systems.
 * 
 * @param {Object} [options] 
 * @param {boolean} [options.autoPlay=true] Whether the manager should immediately start playing after initialization
 * @param {Object} [options.files={}] manager is passed onto the Loader.Please check `Loader.load()` for more information on it.
 * @param {boolean} [options.physics=true] Adds physics world as a System.
 * @param {boolean} [options.renderer=true] Adds a renderer as a system.
 * @param {boolean} [options.input=true] Adds input as a system.
 * 
 **/
export function createManager(options) {
  options = Object.assign({
    autoPlay: true,
    physics: true,
    renderer: true,
    input: true
  }, options)

  let manager = new Manager()

  if (options.input)
    manager.registerSystem("input", new Input())
  if (options.physics) {
    manager.registerSystem("world", new World())
    manager.events.add("collision", defaultCollisionHandler)
    manager.events.add("precollision", defaultPrecollisionHandler)
  }
  if (options.renderer)
    manager.registerSystem("renderer", new Renderer2D())
  return manager
}