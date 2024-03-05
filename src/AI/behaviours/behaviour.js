/**
 * Base class for implementing customized behaviours.
 * 
 */

export class Behaviour {
  /**
   * The maximum speed a behaviour will reach when active.
   * 
   * @type {number}
   */
  maxSpeed = 1000
  /**
   * Maximum force a behaviour will exert on the agent.This affects acceleration, deceleration and turn rate of the agent.
   * 
   * @type {number}
   */
  maxForce = 1000
  /**
   * Whether to exert a behaviour's calculated force onto its agent
   * 
   * @type {boolean}
   */
  active = true
  /**
   * Calculates the amount of force required to satisfy a behavior.
   * 
   * @param {Transform} _transform
   * @param {Movable} _movable
   * @param {Vector2} _linear
   * @param {Angle} _angular
   * @param {number} _inv_dt
   * @returns {void}
   */
  calc(_transform, _movable, _linear, _angular, _inv_dt) {}
}