import { Registry, Scheduler, ImmediateExecutor, RAFExecutor } from "../ecs/index.js"
import { CommandsPlugin } from "../command/index.js"
import { assert, deprecate } from "../logger/index.js"
const registererror = "Systems,`Plugin`s or resources should be registered or set before `App().run()`"

/**
 * @readonly
 * @enum {string}
 */
export const AppSchedule = {
  MainUpdate: "mainupdate",
  Startup: "startup"
}
export class App {
  registry = new Registry()
  scheduler = new Scheduler()
  _initialized = false
  constructor() {
    this.scheduler.set(
      AppSchedule.Startup,
      new ImmediateExecutor(this.registry)
    )
    this.scheduler.set(
      AppSchedule.MainUpdate,
      new RAFExecutor(this.registry)
    )
  }
  run() {
    this.registerPlugin(new CommandsPlugin())
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
    this.scheduler.get(AppSchedule.MainUpdate).add(system)
    return this
  }
  registerStartupSystem(system) {
    assert(!this._initialized, registererror)
    this.scheduler.get(AppSchedule.Startup).add(system)
    return this
  }
  setResource(resource) {
    assert(!this._initialized, registererror)
    this.registry.setResource(resource)
    return this
  }
  hasResource(resource) {
    return this.registry.hasResource(resource)
  }
}