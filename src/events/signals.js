/**
 * @template T
 */
export class Signal {
  /**
   * @type {signalListener<T>[]}
   */
  _listeners = []
  /**
   * @type {T}
   */
  _value
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
      this._listeners[i](this.value)
    }
  }
  /**
   * @param {signalListener<T>} listener
   * @param {boolean} callOnce
   */
  addListener(listener, callOnce = false) {
    this._listeners.push(listener)
  }
  /**
   * @param {signalListener<T>} listener
   */
  removeListener(listener) {
    for (var i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i] == listener)
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
 * @template T
 * @callback signalListener
 * @param {T} value
 * @returns {void}
 */