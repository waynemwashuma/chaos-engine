import { Utils } from "../utils/index.js"
import { Vector } from "../math/index.js"

/**
 * Manages the behaviours for an agent.
 * 
 * @package
 */
class BehaviourManager {
  constructor() {
    this._behaviours = []
    this._accumulated = new Vector()
  }
  /**
   * Adds a behavior to the manager
   * 
   * @param {Behaviour} behaviour 
   */
  add(behaviour) {
    this._behaviours.push(behaviour)
    if(this.active)behaviour.init(this._agent)
  }
  /**
   * Removes a behavior to the manager
   * 
   * @param {Behaviour} behaviour 
   */
  remove(behaviour) {
    Utils.removeElement(this._behaviours, this._behaviours.indexOf(behaviour))
  }
  /**
   * Boots up the behavoiurs of the agent that contains it.
   * 
   * @param {Agent} agent 
  */
  init(agent) {
    this._agent = agent
    for (var i = 0; i < this._behaviours.length; i++) {
      this._behaviours[i].init(agent)
    }
  }
  /**
   * Updates the behaviours of the agent and applies changes to agent.
  */
  update(inv_dt) {
    let result = new Vector()
    this._accumulated.set(0, 0)
    for (let i = 0; i < this._behaviours.length; i++) {
      this._behaviours[i].calc(result, inv_dt)
      this._accumulated.add(result)
    }
    this._agent.acceleration.add(this._accumulated)
    this._agent.orientation.radian = Vector.toRad(this._agent.velocity)
  }
  /**
   * Removes all behaviours from a manager.
  */
  clear() {
    Utils.clearArr(this._behaviours)
  }
  draw(renderer){
    this._behaviours.forEach(b=>b.draw(renderer))
  }
}
export {
  BehaviourManager
}