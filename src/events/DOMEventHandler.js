/**
 * This handles events created by the DOM.
 */
export class DOMEventHandler {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type Object<string,function[]>
   */
  handlers = {}
  /**
   * A dictionary of the main callback functions
   * 
   * @private
   * @type Object<string,function>
   */
  _evHandlers = {}
  /**
   * Adds an eventlistener.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  add(e, h) {
    if (this.handlers[e])
      return this.handlers[e].push(h)
    this.handlers[e] = [h]
    let listener = (event) => {
      let handlers = this.handlers[e]
      for (var i = 0; i < handlers.length; i++) {
        handlers[i](event)
      }
    }
    document.addEventListener(e, listener)
    this._evHandlers[e] = listener
  }
  /**
   * Removes an eventlistener.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  remove(e, h) {
    this.handlers[e].splice(this.handlers[e].indexOf(h), 1)
    if (!this.handlers[e].length)
      this.dispose(e)
  }
  /**
   * Removes all eventlisteners of an event.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  disposeEvent(e) {
    document.removeEventListener(e, this._evHandlers[e])
    delete this.handlers[e]
    delete this._evHandlers[e]
  }
  /**
   * Clears all eventlisteners of every event registered.
   */
  clear() {
    for (var ev in this.handlers) {
      this.dispose(ev)
    }
  }
  /* 
  Donno why this is here,but i do know past me has a reason for this being here.
  Ill leave it for now.
  */
  init() {}
}