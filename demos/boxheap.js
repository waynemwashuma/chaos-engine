import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function boxheap(manager) {
  const viewport = manager.getResource("viewport")
  commands
    .spawn()
    .insertPrefab(
      makePlatform(
        manager,
        viewport.width / 2,
        viewport.height * 0.8,
        viewport.width,
        50
      )
    )
    .build()
  const height = 10
  for (let x = 0; x < 10; x++) {
    stack(200 + x * 50, -100, 50, 50, height, 5, manager)
  }

  manager.getResource("gravity").y = 900
}

function stack(x, y, w, h, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    commands
      .spawn()
      .insertPrefab(createTransform2D(x, y + (h + spacing) * i))
      .insertPrefab(createMovable2D())
      .insertPrefab(createRawRigidBody2D())
      .insert(new BoundingBox())
  }
}