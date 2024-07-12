import { Registry, Scheduler, Schedule, ExecutorKind } from "../ecs/index.js"
import { CommandsPlugin } from "../command/index.js"
import { assert, deprecate } from "../logger/index.js"
const registererror = "Systems,`Plugin`s or resources should be registered or set before `App().run()`"

/**
 * @readonly
 * @enum {string}
 */
export const AppSchedule = {
  MainUpdate:"mainupdate",
  Update: "mainupdate",
  Startup: "startup"
}
export class App {
  registry = new Registry()
  scheduler = new Scheduler()
  _initialized = false
  constructor() {
    this.createSchedule(
      AppSchedule.Startup,
      ExecutorKind.Immediate
    )
    this.createSchedule(
      AppSchedule.MainUpdate,
      ExecutorKind.Raf
    )
  }
  createSchedule(label, kind, time) {
    this.scheduler.set(label, new Schedule(this.registry, kind, time))
  }
  run() {
    this.registerPlugin(new CommandsPlugin())
    this._initialized = true
    this.scheduler.run(this.registry)
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
   * @param {string} label
   * @param {SystemFunc} system
   */
  registerSystem(label,system) {
    const schedule = this.scheduler.get(label)
    console.log(label)
    assert(schedule != void 0,`The system ${system.name} cannot be added to schedule "${label}" as the schedule doesn't exist.`)
    
    schedule.add(system)
    return this
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
  /**
   * @param {Function} type
   */
  registerType(type) {
    this.registry.registerType(type)
    return this
  }
  /**
   * @param {Function} component
   * @param {ComponentHooks} hooks
   */
  setComponentHooks(component, hooks) {
    this.registry.setComponentHooks(component.name.toLowerCase(),hooks)
    return this
  }
  setResource(resource) {
    assert(!this._initialized, registererror)
    this.registry.setResource(resource)
    return this
  }
  getResource(resource) {
    assert(!this._initialized, registererror)
    return this.registry.getResource(resource)
  }
  hasResource(resource) {
    return this.registry.hasResource(resource)
  }
}