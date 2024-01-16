/**
 * @template T
 */
export class IndexedList {
  /**
   * @private
   * @type {Map<string,number>}
   */
  _keys = new Map()
  /**
   * @private 
   * @type {T[]}
   */
  _list = []
  /**
   * @param {string} name
   */
  get(name) {
    return this._list[this._keys.get(name)]
  }
  /**
   * @param {string} name
   * @param {T} value
   */
  set(name, value) {
    this._keys.set(name, this._list.length)
    this._list.push(value)
  }
  /**
   * @param {string} name
   */
  remove(name) {
    this._list.splice(
      this._keys.get(name),
      1
    )
    this._keys.delete(name)
  }
  /**
   * @returns {string[]}
   */
  keys() {
    return this._keys.keys()
  }
  /**
   * @returns {T[]}
   */
  values() {
    return this._list
  }
  /**
   * @param {string} name
   */
  has(name) {
    return this._keys.has(name)
  }
}