import {deprecate} from "../logger/index.js"
  /**
 * Handles time management for the game.
 */
export class Clock {
  /**
   * Last time the clock was updated
   * 
   * @private
   * @type number
   */
  lastcall = 0
  /**
   * Difference between the last call in the last frame and current call.
   * 
   * @type number 
   */
  dt = 0
  /**
   * Updates the clock
   * @deprecated
   * @param {number} [accumulate]
   */
  update(accumulate = performance.now()) {
    deprecate("Clock().update()","Clock.update()")
    return Clock.update(this, accumulate)
  }
  /*getFrameRate(){
    return 1/(this.dt/1000)
  }
  getRoundedFrameRate(){
    return Math.round(this.getFrameRate())
  }*/
  /**
   * Updates the clock
   * 
   * @param {Clock} clock
   * @param {number} [accumulate]
   */
  static update(clock,accumulate = performance.now()) {
    clock.dt = accumulate - clock.lastcall
    clock.lastcall = accumulate

    return clock.dt / 1000
  }
}