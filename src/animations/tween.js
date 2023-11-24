import { Interpolation, Easing } from "../math/index.js"
/**
 * Component responsible for animations.
 * 
 * @template {T}
 */
export class Tween {
  _duration = 0
  _repeat = false
  active = false
  /**
   * @type {T}
   */
  _to = null
  _from = null
  _into = null
  _interpolationFunc = Interpolation.Linear
  _easingFunction = Easing.linear
  _timeTaken = 0
  _updateFunc = () => {}
  _next = null
  /**
   *@template {T}
   *@param {T} to
   *@param {T} from
   *@param {number} duration
   */
  constructor(into) {
    this._into = into
  }
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
  onUpdate(callback) {
    this._updateFunc = callback
    return this
  }
  easing(func) {
    this._easingFunction = func
    return this
  }
  interpolant(func) {
    this._interpolationFunc = func
    return this
  }
  update(dt) {
    if (!this.active) return

    this._timeTaken += dt
    if (this._timeTaken >= this._duration) {
      if(this._next !== void 0){
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
  chain(next) {
    this._next = next
    return this
  }
}

/**
 * @type Tween<number>
 */
let t = new Tween()

/**
 * @template {T}
 * @callback TweenUpdate
 * @param {Function} lerpFunc
 * @param {T} to
 * @param {T} from
 * @param {number} t
 * @param {T} into
 * 
 * @returns {void}
 */

/**
 * @type {TweenUpdate}
 */
export function Vector2Update(lerpFunc, to, from, t, into) {
  into.x = lerpFunc(from.x, to.x, t)
  into.y = lerpFunc(from.y, to.y, t)
}
export function Vector3Update(lerpFunc, to, from, t, into) {
  into.x = lerpFunc(from.x, to.x, t)
  into.y = lerpFunc(from.y, to.y, t)
  into.z = lerpFunc(from.z, to.z, t)
}

export function ColorUpdate(lerpFunc, to, from, t, into) {
  into.r = lerpFunc(from.r, to.r, t)
  into.g = lerpFunc(from.g, to.g, t)
  into.b = lerpFunc(from.b, to.b, t)
  into.a = lerpFunc(from.a, to.a, t)
}

export function AngleUpdate(lerpFunc, to, from, t, into) {
  into.rad = lerpFunc(from.rad, to.rad, t)
}