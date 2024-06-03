import { Command } from '../../command/command.js';

export class SpawnCommand extends Command {
  entity = 0
  components = []
  constructor(entity, components) {
    super()
    this.entity = entity
    this.components = components
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