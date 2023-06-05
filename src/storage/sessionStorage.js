export const Session = {
  set(k,v) {
    let json = JSON.stringify(v)
    sessionStorage.setItem(k,v)
  },
  get(k) {
    let json = sessionStorage.getItem(k)
    return JSON.parse(json)
  },
  clear() {
    sessionStorage.clear()
  }
}