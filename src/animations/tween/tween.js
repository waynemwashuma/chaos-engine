import { Interpolation, Easing, Angle, Color, Vector2 } from "../../math/index.js"
/**
 * Component responsible for animations.
 * 
 * @template T
 */
export class Tween {
  /**
   * @type {number}
   */
  _duration = 0
  /**
   * @type {boolean}
   */
  _repeat = false
  /**
   * @type {boolean}
   */
  active = false
  /**
   * @type {T}
   * @private
   */
  _to
  /**
   * @type {T}
   * @private
   */
  _from
  /**
   * @type {T}
   * @private
   */
  _into
  /**
   * @type {LerpFunc}
   * @private
   */
  _interpolationFunc = Interpolation.Linear
  /**
   * @type {EasingFunc}
   * @private
   */
  _easingFunction = Easing.linear
  /**
   * @type {number}
   * @private
   */
  _timeTaken = 0
  /**
   * @type {TweenUpdate<T>}
   * @private
   */
  _updateFunc = NoUpdateThrow
  /**
   * @type {Tween<T> | null}
   * @private
   */
  _next = null
  /**
   * @param {T} into
   * @param {T} to
   * @param {T} from
   */
  constructor(to,from,into) {
    this._into = into
    this._to = to
    this._from = from
  }
  /**
   * @param {T} x
   */
  to(x) {
    this._to = x
    return this
  }
  /**
   * @param {T} x
   */
  from(x) {
    this._from = x
    return this
  }
  /**
   * @param {number} t
   */
  duration(t) {
    this._duration = t
    return this
  }
  repeat() {
    this._repeat = true
    return this
  }
  play() {
    this._timeTaken = 0
    this.active = true
  }
  stop() {
    this.active = false
  }
  /**
   * @param {TweenUpdate<T>} callback
   */
  onUpdate(callback) {
    this._updateFunc = callback
    return this
  }
  /**
   * @param {EasingFunc} callback
   */
  easing(callback) {
    this._easingFunction = callback
    return this
  }
  /**
   * @param {LerpFunc} callback
   */
  interpolant(callback) {
    this._interpolationFunc = callback
    return this
  }
  /**
   * @template U
   * @param {Tween<U>} tween
   * @param {number} dt
   */
  static update(tween,dt) {
    if (!tween.active) return

    tween._timeTaken += dt
    if (tween._timeTaken >= tween._duration) {
      if (tween._next) {
        tween.stop()
        tween._next.play()
      }
      if (tween._repeat) {
        tween._timeTaken = 0
      } else {
        tween._timeTaken = tween._duration
        tween.active = false
      }
    }
    let t = tween._easingFunction(
      tween._timeTaken / tween._duration
    )
    tween._updateFunc(
      tween._interpolationFunc,
      tween._to,
      tween._from,
      t,
      tween._into
    )
  }
  /**
   * @param {Tween<T>} next
   */
  chain(next) {
    this._next = next
    return this
  }
}
/**
 * @type {TweenUpdate<Vector2>}
 */
export function Vector2Update(lerpFunc, to, from, t, into) {
  console.log(t)
  into.x = lerpFunc(from.x, to.x, t)
  into.y = lerpFunc(from.y, to.y, t)
}
/**
 * @template T
 * 
 * @type {TweenUpdate<T>}
 */
export function Vector3Update(lerpFunc, to, from, t, into) {
  // @ts-ignore
  into.x = lerpFunc(from.x, to.x, t)
  // @ts-ignore
  into.y = lerpFunc(from.y, to.y, t)
  // @ts-ignore
  into.z = lerpFunc(from.z, to.z, t)
}

/**
 * @type {TweenUpdate<Color>}
 */
export function ColorUpdate(lerpFunc, to, from, t, into) {
  into.r = lerpFunc(from.r, to.r, t)
  into.g = lerpFunc(from.g, to.g, t)
  into.b = lerpFunc(from.b, to.b, t)
  into.a = lerpFunc(from.a, to.a, t)
}
/**
 *
 * @type {TweenUpdate<Angle>}
 */
export function AngleUpdate(lerpFunc, to, from, t, into) {
  into.value = lerpFunc(from.value, to.value, t)
}
/**
 * @type {TweenUpdate<any>}
 */
function NoUpdateThrow(lerpFunc, to, from, t, into) {
  throw "The Tween does not have a valid onUpdate callback."
}

/**
 * @template T
 * @callback TweenUpdate
 * @param {LerpFunc} lerpFunc
 * @param {T} to
 * @param {T} from
 * @param {number} t
 * @param {T} into
 * 
 * @returns {void}
 */
 
/**
 * @callback LerpFunc
 * @param {number} p0
 * @param {number} p1
 * @param {number} t
 * @returns {number}
 */
 