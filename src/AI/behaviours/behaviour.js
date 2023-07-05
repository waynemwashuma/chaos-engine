/**
 * Base class for implementing customized behaviours.
 * 
 * @abstract
 */

class Behaviour {
  /**
   * The maximum speed a behaviour will reach when active.
   * 
   * @type number
   */
  maxSpeed = 1000
  /**
   * Maximum force a behaviour will exert on the agent.This affects acceleration, deceleration and turn rate of the agent.
   * 
   * @type number
   */
  maxForce = 1000
  /**
   * Whether to exert a behaviour's calculated force onto its agent
   */
  active = true

  /**
   * Sets up a behavior to work on an agent.
   * 
   * @param {Agent} agent
   */
  init(agent) {}
  /**
   * Calculates the amount of force required to satisfy a behavior.
   * 
   * @param {Vector} target
   * @param {number} inv_dt
   * @returns Vector the first parameter
   */
  calc(target, inv_dt) {}
  /**
   * Used to debug a behavior visually.
   * 
   * @param {Renderer} renderer
   */
  draw(ctx) {}
}
export {
  Behaviour
}