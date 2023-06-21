/**
 * Base class for implementing customized behaviours.
 * 
 * @abstract
*/

class Behaviour {
  constructor() {
    this.active = true
  }
  /**
   * Sets up a behavior to work on an agent.
  */
  init(){}
  /**
   * Calculates the amount of force required to satisfy a behavior
  */
  calc() {}
  
  draw(){}
}
export {
  Behaviour
}