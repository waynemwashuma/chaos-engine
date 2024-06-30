export class Executor {
  /**
   * @type {Registry}
   */
  registry
  /**
   * @type {Schedule}
   */
  schedule
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
  constructor(schedule,registry, time = 0) {
    this.schedule = schedule
    this.registry = registry
    this.time = time
  }
  start(_schedule) {}
  stop() {}
}