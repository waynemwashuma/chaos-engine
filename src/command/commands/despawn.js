import { Command } from './command.js';

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