class IndexedList {
  _keys = new Map()
  _list = []
  get(name) {
    return this._list[this._keys[name]]
  }
  push(name, value) {
    this._keys[name] = this._list.length
    this._list.push(value)
  }
  remove(name) {
    this._list.splice(
      this._keys.get(name),
      1
    )
  }
  values() {
    return this._list
  }
}