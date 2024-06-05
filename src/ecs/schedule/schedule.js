import { Bitset } from "../../dataStructures/index.js"
export class Schedule {
  systems = []
  condition = new Bitset()
  /**
   * @param {Function} system
   * @returns {SystemId}
   */
  add(system) {
    const length = this.systems.length
    this.systems.push(system)
    this.condition.resize(length + 1)
    this.condition.set(length)
    
    return length
  }
  /**
   * @param {Registry} registry
   */
  run(registry) {
    for (let i = 0; i < this.systems.length; i++) {
      if(this.condition.get(i))this.systems[i](registry)
    }
  }
}