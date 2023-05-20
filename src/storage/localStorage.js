class Storage {
  set(k,v) {
    let json = JSON.stringify(v)
    localStorage.setItem(k,v)
  }
  get(k) {
    let json = localStorage.getItem(k)
    return JSON.parse(json)
  }
  clear() {
    localStorage.clear()
  }
}