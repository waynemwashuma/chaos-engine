/**
 * Handled the keyboard input of an application on a PC.
*/
class Keyboard {
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.keys = {}
    this.activeKeys = []
    this.init(eh)
  }
  /**
   * Ensures that keycodes are produced in a consistent manner
   * 
   * @private
   * @param {string} keycode
   * @returns {string}
  */
  normalize(keycode) {
    let r = keycode;
    if (keycode.includes('Key')) {
      r = r.slice(3, r.length)
    }
    return r.toUpperCase()
  }
  /**
   * Adds Keyboard events to the DOM.
   * 
   * @private
   * @param {DOMEventHandler} eh
  */
  init(eh) {
    eh.add('keydown',this._onDown)
    eh.add('keyup',this._onUp)
  }
  _onDown = e => {
    let key = this.normalize(e.code)
    this.keys[key] = true
    this.activeKeys.push(key)
    this.ondown(e)
  }
  _onUp = e =>{
    this.keys[this.normalize(e.code)] = false
    this.onup(e)
  }
  ondown(e) {}
  onup(e) {}
}

export {
  Keyboard
}