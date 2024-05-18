import { Executor } from "./executor.js"

export class IntervalExecutor extends Executor {
  _execute = () => {
    this.schedule.run(this.registry)
  }
  constructor(registry, timeout) {
    super(registry)
    this.time = timeout
  }
  start() {
    this.tick = setInterval(this._execute, this.time)
  }
  stop() {
    clearInterval(this.tick)
  }
}