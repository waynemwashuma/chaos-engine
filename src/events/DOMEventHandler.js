/**
 * This handles events created by the DOM.
 */
export class DOMEventHandler {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type {Record<string,function[]>}
   */
  handlers = {}
  /**
   * A dictionary of the main callback functions
   * 
   * @private
   * @type Object<keyof DocumentEventMap,function>
   */
  _evHandlers = {}
  /**
   * Adds an eventlistener.
   * 
   * @param {keyof DocumentEventMap} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  add(e, h) {
    if (this.handlers[e])
      return this.handlers[e].push(h)
    this.handlers[e] = [h]
    let listener = (/** @type {Event} */ event) => {
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
   * @param {keyof DocumentEventMap} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  remove(e, h) {
    this.handlers[e].splice(this.handlers[e].indexOf(h), 1)
    if (!this.handlers[e].length)
      this.disposeEvent(e)
  }
  /**
   * Removes all eventlisteners of an event.
   * 
   * @param {keyof DocumentEventMap} e Name of the DOMEvent.
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
    for (const ev in this.handlers) {
      // @ts-ignore
      this.disposeEvent(ev)
    }
  }
  /* 
  Donno why this is here,but i do know past me has a reason for this being here.
  Ill leave it for now.
  */
  init() {}
}