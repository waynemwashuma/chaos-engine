import { throws } from "../../logger/index.js"
import { Bitset } from "../../dataStructures/index.js"
import {
  Executor,
  ImmediateExecutor,
  RAFExecutor,
  TimeoutExecutor,
  IntervalExecutor
} from './executors/index.js'

export class Schedule {
  systems = []
  condition = new Bitset()
  /**
   * @type {Executor}
   */
  executor
  /**
   * @param {ExecutorKind} kind
   */
  constructor(registry, kind, time) {
    switch (kind) {
      case ExecutorKind.Immediate:
        this.executor = new ImmediateExecutor(this, registry, time)
        break
      case ExecutorKind.Raf:
        this.executor = new RAFExecutor(this, registry, time)
        break
      case ExecutorKind.Timeout:
        this.executor = new TimeoutExecutor(this, registry, time)
        break
      case ExecutorKind.Interval:
        this.executor = new IntervalExecutor(this, registry, time)
        break
      default:
        throws("No such executor.Use enum `ExecutorKind` to determine which executor to use")
    }
  }
  /**
   * @param {Function} system
   * @returns {SystemId}
   */
  add(system) {
    const length = this.systems.length
    this.systems.push(system)
    this.condition.resize(length + 1)
    this.condition.set(length)

    return length
  }
  /**
   * @param {Registry} registry
   */
  run(registry) {
    for (let i = 0; i < this.systems.length; i++) {
      if (this.condition.get(i)) this.systems[i](registry)
    }
  }
  start() {
    this.executor.start()
  }
  stop() {
    this.executor.stop()
  }
}
/**
 * @readonly
 * @enum {number}
 */
export const ExecutorKind = {
  Immediate: 0,
  Raf: 1,
  Timeout: 2,
  Interval: 3
}