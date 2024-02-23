import { Interpolation, Easing } from "../../math/index.js"
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
  _to = null
  /**
   * @type {T}
   * @private
   */
  _from = null
  /**
   * @type {T}
   * @private
   */
  _into = null
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
   * @type {TweenUpdate}
   * @private
   */
  _updateFunc = NoUpdateThrow
  /**
   * @type {Tween}
   * @private
   */
  _next = null
  /**
   *@param {T} into
   */
  constructor(into) {
    this._into = into
  }
  /**
   * @param {Entity} entity
   */
  init(entity) {
    this.play()
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
   * @param {T} t
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
   * @param {TweenUpdate} callback
   */
  onUpdate(callback) {
    this._updateFunc = callback
    return this
  }
  /**
   * @param {EasingFunc} func
   */
  easing(func) {
    this._easingFunction = func
    return this
  }
  /**
   * @param {LerpFunc} func
   */
  interpolant(func) {
    this._interpolationFunc = func
    return this
  }
  /**
   * @param {number} dt
   */
  update(dt) {
    if (!this.active) return

    this._timeTaken += dt
    if (this._timeTaken >= this._duration) {
      if (this._next !== void 0) {
        this.stop()
        this._next.play()
      }
      if (this._repeat) {
        this._timeTaken = 0
      } else {
        this._timeTaken = this._duration
        this.active = false
      }
    }
    let t = this._easingFunction(
      this._timeTaken / this._duration
    )
    this._updateFunc(
      this._interpolationFunc,
      this._to,
      this._from,
      t,
      this._into
    )
  }
  /**
   * @param {Tween} next
   */
  chain(next) {
    this._next = next
    return this
  }
}
/**
 * @type {TweenUpdate}
 */
export function Vector2Update(lerpFunc, to, from, t, into) {
  into.x = lerpFunc(from.x, to.x, t)
  into.y = lerpFunc(from.y, to.y, t)
}
/**
 * @type {TweenUpdate}
 */
export function Vector3Update(lerpFunc, to, from, t, into) {
  into.x = lerpFunc(from.x, to.x, t)
  into.y = lerpFunc(from.y, to.y, t)
  into.z = lerpFunc(from.z, to.z, t)
}

/**
 * @type {TweenUpdate}
 */
export function ColorUpdate(lerpFunc, to, from, t, into) {
  into.r = lerpFunc(from.r, to.r, t)
  into.g = lerpFunc(from.g, to.g, t)
  into.b = lerpFunc(from.b, to.b, t)
  into.a = lerpFunc(from.a, to.a, t)
}
/**
 * @type {TweenUpdate}
 */
export function AngleUpdate(lerpFunc, to, from, t, into) {
  into.rad = lerpFunc(from.rad, to.rad, t)
}
/**
 * @type {TweenUpdate}
 */
function NoUpdateThrow(lerpFunc, to, from, t, into) {
  throw "The Tween does not have a valid onUpdate callback."
}

/**
 * @template {T}
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
 