import { DOMEventHandler } from "../events/index.js";

/**
 * Handled the keyboard input of an application on a PC.
*/
export class Keyboard {
  /**
   * Dictionary of keys showing if they are active or not.
   * 
   * @type Object<string,boolean>
  */
  keys = {}
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.keys = {}
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
   * @param {DOMEventHandler} eh
  */
  init(eh) {
    eh.add('keydown',this._onDown)
    eh.add('keyup',this._onUp)
  }
  /**
   * @private
  */
  // @ts-ignore
  _onDown = e => {
    let key = this.normalize(e.code)
    this.keys[key] = true
    //this.activeKeys.push(key)
  }
    /**
     * @private
     */
  // @ts-ignore
  _onUp = e =>{
    this.keys[this.normalize(e.code)] = false
  }
}