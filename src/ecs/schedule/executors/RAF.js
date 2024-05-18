import { Executor } from "./executor.js"

export class RAFExecutor extends Executor{
  _execute = (dt) => {
    this.schedule.run(this.registry)
    this.tick = requestAnimationFrame(this._execute)
  }
  start() {
    this._execute(this.time)
  }
  stop() {
    cancelAnimationFrame(this.tick)
  }
}