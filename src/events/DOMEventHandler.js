class DOMEventHandler {
  constructor() {
    this.handlers = {}
    this._evHandlers = {}
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
    this._evHandlers[`_${e}`] = listener
  }
  remove(e, h) {
    this.handlers[e].splice(this.handlers[e].indexOf(h), 1)
    if (!this.handlers[e].length)
      this.dispose(e)
  }
  dispose(e) {
    document.removeEventListener(e, this[`_${e}`])
    delete this.handlers[e]
    delete this._evHandlers[`_${e}`]
  }
  clear() {
    for (var ev in this.handlers) {
      this.dispose(ev)
    }
  }
  init(){}
}

export {
  DOMEventHandler
}