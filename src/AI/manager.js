/**
* A system that manages agent components by updating them.
*/
export class AgentManager {
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