import { Command } from './command.js';

export class SpawnCommand extends Command {
  /**
   * @readonly
   * @type {Entity}
   */
  entity = 0
  /**
   * @type {Any[]}
   */
  components = []
  constructor(entity) {
    super()
    this.entity = entity
  }
  /**
   * @param {any} component
   */
  insert(component) {
    this.components.push(component)
  }
  /**
   * @param {any[]} components
   */
  insertPrefab(components) {
    this.components.push(...components)
  }
  /**
   * @param {Registry} registry
   */
  execute(registry) {
    registry.insert(this.entity, this.components)
  }
}

export class DespawnCommand extends Command {
  entity = 0
  constructor(entity) {
    super()
    this.entity = entity
  }
  execute(registry) {
    registry.remove(entity)
  }
}