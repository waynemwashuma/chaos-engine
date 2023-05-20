class EventDispatcher {
  handlers = {}
  trigger(n, data) {
    if (n in this.handlers)
      this.handlers[n].forEach(h => h(data))
  }
  init(){}
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