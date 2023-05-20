class EventDispatcher {
  events = []
  handlers = {}
  update() {
    for (var i = 0; i < this.events.length; i++) {
      let ev = this.events[i]
      if (ev.name in this.handlers)
        this.handlers[ev.name].forEach(h=>h(ev.data))
    }
    this.clear()
  }
  clear() {
    this.events.length = 0
  }
  emit(name, data) {
    this.events.push({
      name,
      data
    })
  }
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