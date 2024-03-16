import { Vector2, Angle } from "../math/index.js"
import { Behaviour } from "./behaviours/index.js"
/**
 * This is a component class used to add AI behavior to an entity.
 */
export class Agent {
  /**
   * The maximum speed of the agent in pixels per second.
   * 
   * @type {number}
   */
  maxSpeed = 20
  /**
   * Maximum rotation of the agent in radians per second
   * Not yet implemented.
   * @type {number}
   */
  maxTurnRate = 5
  /**
   * 
   * @type {Behaviour[]}
   */
  behaviours = []
  /**
   * Adds a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  add(behaviour) {
    this.behaviours.push(behaviour)
  }
  /**
   * Removes a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  remove(behaviour) {
    this.behaviours.splice(
      this.behaviours.indexOf(behaviour),
      1
    )
  }
  /**
   * :
   * @param {number} inv_dt Inverse of delta time i.e frameRate.
   * @param {Agent} agent
   * @param {any} transform
   * @param {any} movable
   */
  static update(agent, transform, movable, inv_dt) {
    Agent.updateBehaviours(agent.behaviours, transform, movable, inv_dt)
  }
  /**
   * Updates the behaviours of the agent and applies changes to agent.
   * @param {number} inv_dt
   * @param {string | any[]} behaviours
   * @param {any} transform
   * @param {{ acceleration: { add: (arg0: Vector2) => void; }; torque: number; }} movable
   */
  static updateBehaviours(behaviours, transform, movable, inv_dt) {
    const accumulate = new Vector2()
    const angular = new Angle()
    for (let i = 0; i < behaviours.length; i++) {
      behaviours[i].calc(
        transform,
        movable,
        accumulate,
        angular,
        inv_dt
      )
      accumulate.add(accumulate)
    }
    movable.acceleration.add(accumulate)
    movable.torque += angular.value
  }
}