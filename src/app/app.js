import { Registry, Scheduler, ImmediateExecutor, RAFExecutor } from "../ecs/index.js"
import { assert, deprecate } from "../logger/index.js"
const registererror = "Systems,`Plugin`s or resources should be registered or set before `App().run()`"

export class App {
  registry = new Registry()
  scheduler = new Scheduler()
  events
  #startups = 0
  #updates = 0
  _initialized = false
  constructor() {
    this.events = this.registry.events
    this.#startups = this.scheduler.set(
      new ImmediateExecutor(this.registry)
    )
    this.#updates = this.scheduler.set(
      new RAFExecutor(this.registry)
    )
  }
  run() {
    this._initialized = true
    this.scheduler.run(this.registry)
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
    deprecate("App().registerSystem()", "App().registerUpdateSystem()")
    this.registerUpdateSystem(system)
  }
  registerUpdateSystem(system) {
    assert(!this._initialized, registererror)
    this.scheduler.get(this.#updates).add(system)
  }
  registerStartupSystem(system) {
    assert(!this._initialized, registererror)
    this.scheduler.get(this.#startups).add(system)
    return this
  }
  setResource(resource) {
    assert(!this._initialized, registererror)
    this.registry.setResource(resource)
    return this
  }
}