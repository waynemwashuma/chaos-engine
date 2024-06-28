export class Timer {
  /**
   * @type {TimerMode}
   */
  mode
  /**
   * @type {number}
   */
  elapsed = 0
  /**
   * @type {number}
   */
  duration = 0
  /**
   * @type {boolean}
   */
  finished = false
  constructor(duration,mode = TimerMode.ONCE){
    this.duration = duration
    this.mode = mode
  }
  /**
   * @param {Timer} timer
   * @param {number} dt
   */
  static update(timer, dt) {
    timer.elapsed += dt
    timer.finished = false
    if (timer.elapsed >= timer.duration) {
      timer.finished = true
      if (timer.mode === TimerMode.REPEAT)
        timer.elapsed = 0
    }
  }
  /**
   * @param {Timer} timer
   */
  static reset(timer){
    timer.elapsed = 0
    timer.finished = false
  }
}
/**
 * @readonly
 * @enum {number}
 */
export const TimerMode = {
  ONCE : 0,
  REPEAT : 1
}