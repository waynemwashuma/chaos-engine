import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function circlerestitution(manager) {
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
    .spawnBatch(stackHorizontal(100, 500, 25, 5, 100))

  gravity.set(0, 900)
}

function stackHorizontal(x, y, r, no, spacing, commands) {
  const entities = []
  for (let i = 1; i <= no; i++) {
    entities.push([
      ...createRigidBody2D(x + (r + spacing) * i, y),
      Shape2D.circle(r)
      ])
  }
  return entities
}