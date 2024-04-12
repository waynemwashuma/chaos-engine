import { Registry } from "../ecs/index.js"
import { assert,deprecate } from "../logger/index.js"
const registererror = "Systems,`Plugin`s or resources should be registered or set before `App().run()`"

export class App {
  registry = new Registry()
  events
  #startups = []
  #updates = []
  _initialized = false
  constructor() {
    this.events = this.registry.events
  }
  async run() {
    this._initialized = true
    for (let i = 0; i < this.#updates.length; i++) {
      this.registry.registerSystem(this.#updates[i])
    }
    for (let i = 0; i < this.#startups.length; i++) {
      await this.#startups[i](this.registry)
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
   * @deprecated
   * @param {SystemFunc} system
   */
  registerSystem(system) {
    deprecate("App().registerSystem()","App().registerUpdateSystem()")
    this.registerUpdateSystem(system)
  }
  registerUpdateSystem(system) {
    assert(!this._initialized, registererror)
    this.#updates.push(system)
  }
  registerStartupSystem(system) {
    assert(!this._initialized, registererror)
    this.#startups.push(system)
    return this
  }
  setResource(resource) {
    assert(!this._initialized, registererror)
    this.registry.setResource(resource)
    return this
  }
}