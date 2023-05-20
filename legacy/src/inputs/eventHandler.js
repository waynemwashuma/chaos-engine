class EventHandler {
  constructor() {
    this.handlers = {}
  }
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
    this[`_${e}`] = listener
  }
  remove(e, h) {
    this.handlers[e].slice(this.handlers[e].indexOf(h), 1)
    if (!this.handlers[e].length)
      this.dispose(e)
  }
  replace(e, h, nh) {
    this.remove(e, h)
    this.add(e, nh)
  }
  dispose(e) {
    document.removeEventListener(e, this[`_${e}`])
    delete this.handlers[e]
    delete this[`_${e}`]
  }
  clear() {
    for (var ev in this.handlers) {
      this.dispose(ev)
    }
  }
}

export {
  EventHandler
}