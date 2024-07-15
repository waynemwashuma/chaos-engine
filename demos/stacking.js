import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function stacking(manager) {
  const viewport = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
const gravity = manager.getResource("gravity")
  commands
    .spawn()
    .insertPrefab(makePlatform(
      viewport.width / 2,
      viewport.height * 0.8,
      viewport.width,
      50
    ))
    .build()
    
  commands
  .spawnBatch(stack(200, 100, 50, 50, 12, 5))
  commands
  .spawnBatch(stack(400, 100, 50, 50, 12, 5))
  commands
  .spawnBatch(stack(600, 100, 50, 50, 12, 5))
  commands
  .spawnBatch(stack(800, 100, 50, 50, 12, 5))
  
  gravity.set(0, 900)
}

function stack(x, y, w, h, no, spacing, commands) {
  const entities = []
  for (let i = 0; i < no; i++) {
    entities.push([
      ...createRigidBody2D(x, y + (h + spacing) * i),
      Shape2D.rectangle(w, h)
      ])
  }
  return entities
}