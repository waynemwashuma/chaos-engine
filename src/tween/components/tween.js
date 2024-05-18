import { Easing } from "../../math/index.js"
/**
 * Component responsible for animations.
 * 
 * @template T
 */
export class Tween {
  /**
   * @type {number}
   */
  duration = 0
  /**
   * @type {boolean}
  */
  finish = false
  /**
   * @type {T}
   * @private
   */
  to
  /**
   * @type {T}
   */
  from
  /**
   * @type {EasingFunc}
   */
  easing
  /**
   * @type {number}
   */
  timeTaken = 0
  /**
   * @param {T} to
   * @param {T} from
   */
  constructor(to, from, duration, repeat = false,flip = true,easing = Easing.linear) {
    this.to = to
    this.from = from
    this.repeat = repeat
    this.flip = flip
    this.duration = duration
    this.easing = easing
  }

  static play(tween) {
    tween.timeTaken = 0
  }
  static stop(tween) {
    tween.timeTaken = tween.duration
  }
}