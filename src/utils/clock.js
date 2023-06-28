/**
 * Handles time management for the game.
*/
class Clock {
  /**
   * Last time the clock was updated
   * 
   * @private
   * @type number
  */
  lastcall = 0
  /**
   * Difference between the last call in the last frame and current call.
   * 
   * @type number 
  */
  dt = 0
  /*getFrameRate(){
    return 1/(this.dt/1000)
  }
  getRoundedFrameRate(){
    return Math.round(this.getFrameRate())
  }*/
  update(accumulate){
    this.dt = accumulate - this.lastcall || 0
    //this.framerate = this.getFrameRate()
    this.lastcall = accumulate 
    this.delta = this.dt/1000
    return this.delta
  }
}
export{
  Clock
}