/**
 * This provides temporary storage when your application tab is open.
 * 
 * @module Session
*/
export const Session = {
  /**
   * Adds a value to sessions
   * 
   * @param {string} k 
   * @param {any} v
  */
  set(k,v) {
    let json = JSON.stringify(v)
    sessionStorage.setItem(k,v)
  },
  /**
   * Gets a value from sessions using a key
   * 
   * @param {string} k A key to retrieve a value
  */
  get(k) {
    let json = sessionStorage.getItem(k)
    return JSON.parse(json)
  },
  /**
   * Removes everything from sessions
  */
  clear() {
    sessionStorage.clear()
  }
}