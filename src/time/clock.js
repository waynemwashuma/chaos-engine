import { deprecate } from "../logger/index.js"
/**
 * Handles time management for the game.
 */
export class Clock {
  /**
   * 
   * @type {number}
   */
  elapsed = 0
  /**
   * @type {number}
   */
  lastTick = 0
  /**
   * Difference between the last call in the last frame and current call.
   * 
   * @type {number} 
   */
  delta = 0
  /**
   * @type {number}
   */
  fps = 0
  /**
   * Updates the clock
   * @deprecated
   * @param {number} [accumulate]
   */
  update(accumulate = performance.now()) {
    deprecate("Clock().update()", "Clock.update()")
    return Clock.update(this, accumulate)
  }
  /**
   * starts the clock
   * 
   * @param {Clock} clock
   */
  static start(clock) {
    clock.start = performance.now()
    clock.delta = 0
  }
  /**
   * Gets the elapsed time of the clock
   * 
   * @param {Clock} clock
   */
  static getElapsed(clock) {
    return performance.now() - clock.start
  }
  /**
   * Gets the time between two frames/ticks clock
   * 
   * @param {Clock} clock
   */
  static getDelta(clock) {
    return clock.delta
  }
  /**
   * Gets the frameRate of the clock
   * 
   * @param {Clock} clock
   */
  static getFrameRate(clock) {
    return 1000 / clock.delta
  }
  /**
   * Updates the clock
   * 
   * @param {Clock} clock
   * @param {number} [accumulate]
   */
  static update(clock, accumulate = performance.now()) {
    clock.delta = (accumulate - clock.lastTick) / 1000
    clock.fps = clock.delta ? 1 / clock.delta : 0
    clock.elapsed += clock.delta
    clock.lastTick = accumulate
    return clock.delta
  }
}