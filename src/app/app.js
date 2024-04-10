import { Registry } from "../ecs/index.js"
import { throws } from "../logger/index.js"

export class App {
  registry = new Registry()
  events
  #startups = []
  _initialized = false
  constructor() {
    this.events = this.registry.events
  }
  run() {
    for (let i = 0; i < this.#startups.length; i++) {
      this.#startups[i](this.registry)
    }
    this.registry.events.trigger("init")
    return this
  }
  /**
   * @param {Plugin} plugin
   */
  registerPlugin(plugin) {
    plugin.register(this)
    return this
  }
  /**
   * @param {Plugin} debug
   */
  registerDebugger(debug) {
    return this.registerPlugin(debug)
  }
  /**
   * @param {SystemFunc} system
   */
  registerSystem(system) {
    if (this._initialized) throws("`App().registerSystem()` cannot be called after `App().run()`")
    this.registry.registerSystem(system)
    return this
  }
  registerStartupSystem(system){
    this.#startups.push(system)
    return this
  }
  setResource(resource) {
    this.registry.setResource(resource)
    return this
  }
}