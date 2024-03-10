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
   * @type {string[]}
   */
  _actualKeys = []
  /**
   * @private 
   * @type {T[]}
   */
  _list = []
  /**
   * @param {string} name
   */
  get(name) {
    const index = this._keys.get(name)
    if(!index)return undefined
    return this._list[index]
  }
  /**
   * @param {string} name
   * @param {T} value
   */
  set(name, value) {
    this._keys.set(name, this._list.length)
    this._list.push(value)
    this._actualKeys.push(name)
  }
  /**
   * @param {string} name
   */
  remove(name) {
    const index = this._keys.get(name)
    if(!index)return
    this._actualKeys.splice(index, 1)
    this._list.splice(index, 1)
    this._keys.delete(name)
  }
  /**
   * @returns {string[]}
   */
  keys() {
    return this._actualKeys
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