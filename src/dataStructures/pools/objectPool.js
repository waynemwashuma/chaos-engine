/**
 * @template T
 * An extendable object pool for optimizing performance.
 */

export class Pool {
  /**
   * List of objects
   * 
   * @type T[]
  */
  _pool = []
  /**
   * @param {number} number Number of objects to create at the initialization.
   */
  constructor(number = 100) {
    for (var i = 0; i < number; i++) {
      this._pool.push(this.create())
    }
  }
  /**
   * The number of objects available in the pool.
   * 
   * @type {number}
  */
  get size() {
    return this._pool.length
  }
  set size(x) {
    let d = this._pool.length - x
    if (d < 0) {
      for (var i = d; i < 0; i++) {
        this._pool.push(this.create())
      }
      return
    }
    if (d > 0) {
      for (var i = d; i > 0; i--) {
        this._pool.pop()
      }
      return
    }
  }
  /**
   * Gives an object ownership.
   * 
   * @returns {T}
   */
  give() {
    if (this._pool.length) {
      return this._pool.pop()
    }
    return this.create()
  }
  /**
   * Takes an object's ownership.
   * Do not use the taken object and remove all references of it outside otherwise you will get some wierd behaviour.
   * 
   * @param {T} obj
   */
  take(obj) {
    this._pool.push(this.destroy(obj))
  }
  /**
   * Does some cleanup on a taken object.
   * 
   * @protected
   * @param {T} obj
   */
  destroy(obj) {
    for (var prop in obj) {
      delete obj[prop]
    }
    return obj
  }
  /**
   * Creates a new object.
   * 
   * @protected
   * @returns T
  */
  create() {
    return {}
  }
}