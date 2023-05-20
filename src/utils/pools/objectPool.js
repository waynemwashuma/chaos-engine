class Pool {
  constructor(number = 100) {
    this._pool = []
    for (var i = 0; i < number; i++) {
      this._pool[i] = this.create()
    }
  }
  get size(){
    return this._pool.length
  }
  set size(x){
    let d = this._pool.length - x
    if(d < 0){
      for (var i = d; i < 0; i++) {
        this._pool.push(this.create())
      }
      return
    }
    if (d > 0) {
      for (var i = d; i >0; i--) {
        this._pool.pop()
      }
      return
    }
    
  }
  give(){
    if (this._pool.length) {
      return this.pool.pop()
    }
    return this.create()
  }
  take(obj){
    this._pool.push(this.destroy(obj))
  }
  destroy(obj){
    for (var prop in obj) {
      delete obj[prop]
    }
    return obj
  }
  create(){
    return {}
  }
}

export{
  Pool
}