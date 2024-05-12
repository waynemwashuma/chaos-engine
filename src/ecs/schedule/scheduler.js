import { Schedule } from "./schedule.js"
import { Executor } from "./executors/index.js"

export class Scheduler {
  /**
   * @type {Executor[]}
   */
  executors = []
  /**
   * @param {Executor} executor
   */
  set(executor) {
    return this.executors.push(executor) - 1
  }
  /**
   * @param {ScheduleId} id
   * @returns {Schedule}
   */
  get(id) {
    return this.executors[id].schedule
  }
  run() {
    for (let i = 0; i < this.executors.length; i++) {
      this.executors[i].start()
    }
  }
  stop() {
    for (let i = 0; i < this.executors.length; i++) {
      this.executors[i].stop()
    }
  }
}