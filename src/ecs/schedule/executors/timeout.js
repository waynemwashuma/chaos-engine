import { Executor } from "./executor.js"

export class TimeoutExecutor extends Executor {
  _execute = () => {
    this.schedule.run(this.registry)
  }
  start() {
    this.tick = setTimeout(this._execute,this.time)
  }
  stop() {
    clearTimeout(this.tick)
  }
}