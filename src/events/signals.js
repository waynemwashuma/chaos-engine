/**
 * @template T
 */
export class Signal {
  _listeners = []
  /**
   * @type {T}
   */
  _value = null
  /**
   * @param {T} value
   */
  constructor(value) {
    this._value = value
  }
  /**
   * @type {T}
   */
  get value() {
    return this._value
  }
  set value(x) {
    this._value = x
    for (var i = 0; i < this._listeners.length; i++) {
      let func = this._listeners[i]
      func.listener(this)
      if (func.callOnce)
        this.removeListener(func.listener)
    }
  }
  /**
   * @param {signalListener} listener
   * @param {boolean} callOnce
   */
  addListener(listener, callOnce = false) {
    this._listeners.push({
      listener,
      callOnce
    })
  }
  /**
   * @param {signalListener} listener
   */
  removeListener(listener) {
    for (var i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i].listener == listener)
        return this._detach(i)
    }
  }
  /**
   * @private
   * @param {number} bindingIndex
   */
  _detach(bindingIndex) {
    this._listeners.splice(bindingIndex, 1)
  }
}

/**
 * @callback signalListener
 * @param {Signal} value
 * @returns {void}
 */