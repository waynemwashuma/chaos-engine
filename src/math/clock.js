/**
 * Handles time management for the game.
*/
export class Clock {
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
  /**
   * Updates the clock
   * 
   * @param {number} [accumulate]
  */
  update(accumulate = performance.now()){
    console.log(this.dt)
    this.dt = accumulate - this.lastcall || 0
    this.lastcall = accumulate
    
    return this.dt/1000
  }
}