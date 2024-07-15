import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function circlestacking(manager) {
  const viewport = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")

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

  commands
    .spawnBatch(stack(200, 300, 25, 8, 5))


  gravity.set(0, 900)
}

function stack(x, y, r, no, spacing) {
  const entities = []
  for (let i = 0; i < no; i++) {
    entities.push([
      ...createRigidBody2D(x, y + (r * 2 + spacing) * i),
      Shape2D.circle(r)
    ])
  }
  return entities
}