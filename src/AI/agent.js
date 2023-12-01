import { Component } from "../ecs/index.js"
import { BehaviourManager } from "./behaviourManager.js"

/**
 * This is a component class used to add AI behavior to an entity.
 * 
 * @implements Component
 */
class Agent {
  /**
   * The position of the entity.
   * 
   * @type Vector2
   */
  position = null
  /**
   * The velocity of the entity.
   * 
   * @type Vector2
   */
  velocity = null
  /**
   * The acceleration of the entity.
   * 
   * @type Vector2
   */
  acceleration = null
  /**
   * The orientation of the entity.
   * 
   * @type Angle
   */
  orientation = null
  /**
   * The rotation of the entity.
   * 
   * @type Angle
   */
  rotation = null
  /**
   * The maximum speed of the agent in pixels per second.
   * 
   * @type number
   */
  maxSpeed = 20
  /**
   * Maximum rotation of the agent in radians per second
   * Not yet implemented.
   */
  maxTurnRate = 5
  /**
   * 
   * @private
   * @type BehaviourManager
   */
  behaviours = new BehaviourManager()
  /**
   * @inheritdoc
   * @param {Entity} entity
   */
  init(entity) {
    this.requires(entity,"transform", "movable")
    let move = entity.get("movable"),
      transform = entity.get("transform")
    this.velocity = move.velocity
    this.rotation = move.rotation
    this.position = transform.position
    this.orientation = transform.orientation
    this.acceleration = move.acceleration
    this.behaviours.init(this)
  }
  /**
   * Adds a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  add(behaviour) {
    this.behaviours.add(behaviour)
  }
  /**
   * Removes a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  remove(behaviour) {
    this.behaviours.remove(behaviour)
  }
  /**
   * @inheritdoc
   * @param {number} inv_dt Inverse of delta time i.e frameRate.
   */
  update(inv_dt) {
    this.behaviours.update(inv_dt)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.behaviours.draw(ctx)
  }
}
Component.implement(Agent)
export {
  Agent
}