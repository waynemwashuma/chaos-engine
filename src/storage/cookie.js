export const Cookies = {
  _pairs: null,
  split() {
    let pairs = document.cookie.split(';')
    let ret = {}
    for (let i = 0; i < pairs.length; i++) {
      let cookie = pairs[i].split("=")
      ret[cookie[0]] = cookie[1]
    }
    return ret
  },
  set(n, v, maxAge= 1200000) {
    document.cookie = `${n}=${v};maxAge=${maxAge}`
  },
  get(n) {
    let arr = document.cookie.split(";")
    for (var i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=')
      if (pair[0].includes(n))
        return pair[1]
    }
  },
  delete(n){
    document.cookie = `${n}=; max-age=0`;
  },
  clear() {
    let arr = document.cookie.split(";")
    for (var i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=')
      this.delete(pair[0])
    }
  }
}

Cookies._pairs = Cookies.split()