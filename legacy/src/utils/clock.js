class Clock {
  constructor() {
    this.lastcall = 0
    this.dt = 0
  }
  getFrameRate(){
    return 1/(this.dt/1000)
  }
  getRoundedFrameRate(){
    return Math.round(this.getFrameRate())
  }
  update(accumulate){
    this.dt = accumulate - this.lastcall
    this.framerate = this.getFrameRate()
    this.lastcall = accumulate 
    this.delta = this.dt/1000
    return this.delta
  }
}
export{
  Clock
}