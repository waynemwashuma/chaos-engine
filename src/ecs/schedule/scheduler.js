import { Schedule } from "./schedule.js"
import { Executor } from "./executors/index.js"
import { IndexedList } from "../../dataStructures/index.js"

export class Scheduler {
  /**
   * @type {IndexedList<Executor>}
   */
  executors = new IndexedList()
  /**
   * @param {string} label
   * @param {Executor} executor
   */
  set(label, executor) {
    this.executors.set(label,executor)
  }
  /**
   * @param {string} label
   * @returns {Schedule}
   */
  get(label) {
    return this.executors.get(label).schedule
  }
  run() {
    const executors = this.executors.values()
    for (let i = 0; i < executors.length; i++) {
      executors[i].start()
    }
  }
  stop() {
    const executors = this.executors.values()
    for (let i = 0; i < executors.length; i++) {
      executors[i].stop()
    }
  }
}