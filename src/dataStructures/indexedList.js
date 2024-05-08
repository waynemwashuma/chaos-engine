/**
 * @template T
 * @template [U = string]
 */
export class IndexedList {
  /**
   * @private
   * @type {Map<U,number>}
   */
  _keys = new Map()
  /**
   * @private
   * @type {U[]}
   */
  _actualKeys = []
  /**
   * @private 
   * @type {T[]}
   */
  _list = []
  /**
   * @param {U} name
   */
  get(name) {
    const index = this._keys.get(name)
    if(index == undefined)return undefined
    return this._list[index]
  }
  /**
   * @param {U} name
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
    if(index == undefined)return
    this._actualKeys.splice(index, 1)
    this._list.splice(index, 1)
    this._keys.delete(name)
  }
  /**
   * @returns {U[]}
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
   * @param {U} name
   */
  has(name) {
    return this._keys.has(name)
  }
}