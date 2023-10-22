/**
 * This provides permanent storage
*/

export const Storage = {
  /**
   * Adds a value to local storage
   * 
   * @param {string} k 
   * @param {any} v
  */
  set(k,v) {
    let json = JSON.stringify(v)
    localStorage.setItem(k,json)
  },
  /**
   * Gets a value from local storage by its key.
   * 
   * @param {string} k
  */
  get(k) {
    let json = localStorage.getItem(k)
    return JSON.parse(json)
  },
  /**
   * Removes everything from local storage 
  */
  clear() {
    localStorage.clear()
  }
}