import {System} from "../ecs/index.js"

  /**
 * A system that manages agent components by updating them.
 */
export class AgentManager extends System{
  /**
   * A list of agents to update every frame.
   * 
   * @type Agent[]
  */
  objects = []
  /**
   * Initializes the manager.
   * 
   * @param {Manager} manager
  */
  init(manager) {
    manager.setComponentList("agent", this.objects)
  }
  /**
   * Update all registered agents.
   * 
   * @param {number} dt
  */
  update(dt) {
    let inv_dt = 1 / dt
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(inv_dt)
    }
  }
}