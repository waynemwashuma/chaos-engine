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