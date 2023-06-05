export const Cookies = {
  _pairs : null,
  split() {
    let pairs = document.cookie.split(';')
    let ret = {}
    for (let i = 0; i < pairs.length; i++) {
      let cookie = pairs[i].split("=")
      ret[cookie[0]] = cookie[1]
    }
    return ret
  },
  set() {},
  get() {},
  clear() {
    document.cookie = ""
  }
}

Cookies._pairs = Cookies.split()