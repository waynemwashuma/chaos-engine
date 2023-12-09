export class IndexedList {
  _keys = new Map()
  _list = []
  get(name){
    return this._list[this._keys.get(name)]
  }
  set(name, value) {
    this._keys.set(name,this._list.length)
    this._list.push(value)
  }
  remove(name) {
    this._list.splice(
      this._keys.get(name),
      1
    )
    this._keys.delete(name)
  }
  keys(){
    return this._keys.keys()
  }
  values() {
    return this._list
  }
}