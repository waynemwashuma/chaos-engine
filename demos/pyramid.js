import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D,
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function pyramid(manager) {
  const viewport = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")
  const viewX = viewport.width / 2

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
    .spawnBatch(stackpyramid(viewX, 100, 50, 50, 10, 0))

  gravity.set(0, 900)
}

function stackpyramid(x, y, w, h, no, spacing) {
  const entities = []
  let dx = x - (w / 2 * no)
  for (let j = no; j > 0; j--) {
    dx += w / 2
    for (let i = 0; i < j; i++) {
      entities.push([
        ...createRigidBody2D(dx + w * i, y + (h + spacing) * j),
        Shape2D.rectangle(w, h)
        ])
    }
  }
  return entities
}