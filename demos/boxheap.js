import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function boxheap(manager) {
  const commands = manager.getResource("entitycommands")
  const viewport = manager.getResource("viewport")
  const gravity = manager.getResource("gravity")

  const height = 10

  commands
    .spawn()
    .insertPrefab(
      makePlatform(
        viewport.width / 2,
        viewport.height * 0.8,
        viewport.width,
        50
      )
    )
    .build()

  for (let x = 0; x < 10; x++) {
    commands
      .spawnBatch(stack(200 + x * 50, -100, 50, 50, height, 5))
  }

  gravity.set(0, 900)
}

function stack(x, y, w, h, no, spacing) {
  const entities = []
  for (let i = 0; i < no; i++) {
    entities.push([
      ...createRigidBody2D(x, y + (h + spacing) * i),
      Shape2D.rectangle(w, h)
    ])
  }
  return entities
}