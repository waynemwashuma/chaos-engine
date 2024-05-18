import { Executor } from "./executor.js"

export class ImmediateExecutor extends Executor {
  start() {
    this.schedule.run(this.registry)
  }
  stop() {}
}