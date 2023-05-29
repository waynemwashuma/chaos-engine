/**
 * This class manages all events by a game manager.
 * When adding a handler to an event with another handler,the latter will not be overriden,rather,the former will be added to complement the latter.
*/
class EventDispatcher {
  handlers = {}
  /**
   * This fires all event handlers of a certain event.
   * 
   * @param {string} n the name of event fired.
   * @param {any} data The payload of the event.
  */
  trigger(n, data) {
    if (n in this.handlers)
      this.handlers[n].forEach(h => h(data))
  }
  /**
   * Ignore this,must be here for it to be a system.Might make this class not a system later
  */
  init(){}
  /**
   * Adds an event handler to an event dispatcher.
   * 
   * @param {string} name name of the event.
   * @param {function} handler Function to be called when the event is triggered.
  */
  add(name, handler) {
    if (name in this.handlers) {
      this.handlers[name].push(handler)
      return
    }
    this.handlers[name] = [handler]
  }
}
export {
  EventDispatcher
}