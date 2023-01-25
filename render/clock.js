class Clock {
  constructor() {
    this.lastcall = 0
  }
  getdelta(dt){
    return dt - this.lastcall
  }
  getFrameRate(dt){
    return 1/(dt/1000)
  }
  getRoundedFrameRate(dt){
    return Math.round(this.getFrameRate())
  }
  update(accumulate){
    let dt = this.getdelta(accumulate)
    this.framerate = this.getFrameRate(dt)
    this.lastcall = accumulate 
    this.delta = dt/1000
    return this.delta
  }
}
export{
  Clock
}