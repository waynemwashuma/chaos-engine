export class Schedule {
  systems = []
  /**
   * @param {Function} system
   * @returns {SystemId}
   */
  add(system) {
    return this.systems.push(system) - 1
  }
  /**
   * @param {Registry} registry
   */
  run(registry) {
    for (let i = 0; i < this.systems.length; i++) {
      this.systems[i](registry)
    }
  }
}