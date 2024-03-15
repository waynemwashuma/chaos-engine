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
   * @param {()=>T} create 
   */
  constructor(number = 100,create) {
    this._create = create
    for (var i = 0; i < number; i++) {
      this._pool.push(this._create())
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
        this._pool.push(this._create())
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
    const p = this._pool.pop()
    if (p) return p
    return this._create()
  }
  /**
   * Takes an object's ownership.
   * Do not use the taken object and remove all references of it outside otherwise you will get some wierd behaviour.
   * 
   * @param {T} obj
   */
  take(obj) {
    this._pool.push(obj)
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