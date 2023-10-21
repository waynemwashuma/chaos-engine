class Accumulator {
  constructor(maximum,reset = true) {
    this._accumulate = 0
    this._max = maximum
  }
  get accumulate(){
    return this._accumulate
  }
  update(dt){
    let accumulate = this._accumulate + dt
    if(accumulate>this._max){
      if(this.reset)this._accumulate = 0
      return true
    }
    this._accumulate = accumulate
    return false
  }
}

export {
  Accumulator
}