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
   * @type {Object<keyof DocumentEventMap,function>}
   */
  evlisteners = {}
  /**
   * @type {HTMLElement}
  */
  target
  /**
   * @param {HTMLElement} target
  */
  constructor(target = document.body){
    this.target = target
  }
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
    this.target.addEventListener(e, listener)
    this.evlisteners[e] = listener
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
    document.removeEventListener(e, this.evlisteners[e])
    delete this.handlers[e]
    delete this.evlisteners[e]
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
  /**
   * @param {HTMLElement} element
  */
  bindTo(element){
    for (let ev in this.evlisteners) {
      const listener = this.evlisteners[name]
      this.target.removeEventListener(name,listener)
      element.addEventListener(name,listener)
    }
    this.target = element
  }
}