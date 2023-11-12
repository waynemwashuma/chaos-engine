export class Signal {
  _listeners = []
  _value = null
  constructor(value){
    this._value = value
  }
  set value(x) {
    this._value == x
    for (var i = 0; i < this._listeners.length; i++) {
      let func = this._listeners[i]
      func.listener(this)
      if(func.callOnce)
      this.removeListener(func.listener)
    }
  }
  get value() {
    return this._value
  }
  addListener(listener,callOnce=false) {
    this._listeners.push({
      listener,
      callOnce
    })
  }
  removeListener(listener) {
    for (var i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i].listener == listener)
        return this._detach(i)
    }
  }
  _detach(bindingIndex){
    this._listeners.splice(i, 1)
  }
}