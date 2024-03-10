/**
 * This class manages all events by a game manager.
 * When adding a handler to an event with another handler,the latter will not be overriden,rather,the former will be added to complement the latter.
 */
export class EventDispatcher {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type Object<string,function[]>
   */
  handlers = {}
  /**
   * @private
   * @type Object<string,any>
  */
  events = {}
  /**
   * This fires all event handlers of a certain event.
   * 
   * @param {string} n the name of event fired.
   * @param {any} data The payload of the event.
   */
  trigger(n, data) {
    this.addEvent(n,data)
    if (n in this.handlers)
      this.handlers[n].forEach(h => h(data))
  }
  /**
   * Adds an event handler to an event dispatcher.
   * 
   * @param {string} name name of the event.
   * @param {EventHandlerFunc} handler Function to be called when the event is triggered.
   */
  add(name, handler) {
    if (name in this.handlers) {
      this.handlers[name].push(handler)
      return
    }
    this.handlers[name] = [handler]
  }
  /**
   * @param {string} n
   * @param {any} data
   */
  addEvent(n,data){
    this.events[n] = data
  }
  /**
   * @param {string} n
   */
  getEvent(n){
    return this.events[n]
  }
  clear(){
    for (const name in this.events) {
      delete this.events[name]
    }
  }
}

/**
 * @callback EventHandlerFunc
 * @param {any} data 
 * 
 * @returns {void}
*/