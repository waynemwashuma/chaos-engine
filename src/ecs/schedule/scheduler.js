import { Schedule } from "./schedule.js"

export class Scheduler {
  /**
   * @type {Map<string,Schedule>}
   */
  schedules = new Map()
  /**
   * @param {string} label
   * @param {Schedule} executor
   */
  set(label, executor) {
    this.schedules.set(label, executor)
  }
  /**
   * @param {string} label
   * @returns {Schedule}
   */
  get(label) {
    return this.schedules.get(label)
  }
  run() {
    const schedules = this.schedules.values()
    for (const schedule of schedules) {
      schedule.start()
    }
  }
  stop() {
    const schedules = this.schedules.values()
    for (const schedule of schedules) {
      schedule.stop()
    }
  }
}