import { CommandQueue } from "./queue.js"
import {
  SpawnCommand,
  DespawnCommand
} from "../commands/index.js"
import { assert } from "../../logger/index.js"

const entityerror = "Spawn an entity using `Entity.spawn()` before using "

export class EntityCommands {
  /**
   * @type {CommandQueue<SpawnCommand>}
   */
  spawnqueue = new CommandQueue()
  /**
   * @type {CommandQueue<SpawnCommand>}
   */
  despawnqueue = new CommandQueue()
  /**
   * @type {SpawnCommand | null}
   */
  buffered = null
  constructor(registry) {
    this.registry = registry
  }
  spawn() {
    const entity = this.registry.create([])
    this.buffered = new SpawnCommand(entity, [])
    return this
  }
  spawnBatch(batch) {
    const entities = []
    for (let i = 0; i < batch.length; i++) {
      const entity = this
        .spawn()
        .insertPrefab(batch[i])
        .build()
        entities.push(entity)
    }
    return entities
  }
  build() {
    assert(this.buffered, entityerror + "`EntityCommands.build()`.")
    this.spawnqueue.add(this.buffered)
    this.buffered = null
  }
  id() {
    assert(this.buffered, entityerror + "`EntityCommands.id()`.")
    const entity = this.buffered.entity
    this.build()
    return entity
  }
  /**
   * @template T
   * @param {T} component
   */
  insert(component) {
    assert(this.buffered, entityerror + "`EntityCommands.insert()`.")
    this.buffered.insert(component)
    return this
  }
  insertPrefab(components) {
    assert(this.buffered, entityerror + "`EntityCommands.insertPrefab()`.")

    this.buffered.insertPrefab(components)
    return this
  }
  despawn(entity) {
    this.despawnqueue.add(new DespawnCommand(entity))
  }
  apply(registry) {
    this.spawnqueue.apply(registry)
    this.despawnqueue.apply(registry)
  }
  clear() {
    this.spawnqueue.clear()
    this.despawnqueue.clear()
  }
}