import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D,
  SpawnCommand
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function box(manager) {
  const rect = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")

  commands
    .spawn()
    .insertPrefab(createRigidBody2D(rect.width / 2, 400, Math.PI / 3.99, 1))
    .insert(Shape2D.rectangle(50, 50))
    .build()
  commands
    .spawn()
    .insertPrefab(
      makePlatform(
        rect.width / 2,
        rect.height * 0.8,
        rect.width,
        400
      )
    )
    .build()
  gravity.set(0, 900)
}