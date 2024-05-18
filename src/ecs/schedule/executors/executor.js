import { Schedule } from "../schedule.js"

export class Executor {
  /**
   * @type {Registry}
   */
  registry
  /**
   * @type {Schedule}
   */
  schedule = new Schedule()
  /**
   * @type {number}
   */
  tick = 0
  /**
   * @type {number}
   */
  time = 0
  /**
   * @param {Registry} registry
   * @param {number} time
  */
  constructor(registry, time = 0) {
    this.registry = registry
    this.time = time
  }
  start() {}
  stop() {}
}