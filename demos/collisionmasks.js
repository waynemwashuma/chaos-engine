import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D,
  SpawnCommand
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function collisionmasks(manager) {
  const groups = {
    one: 1n << 0n,
    two: 1n << 1n,
    three: 1n << 2n,
    all: 0xFFFFFFFFn,
  }
  const rect = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")

  commands
    .spawn()
    .insertPrefab(createRigidBody2D(
      rect.width / 2 - 100,
      200,
      0,
      0.3,
      1,
      1,
      groups.one,
      groups.one
    ))
    .insert(Shape2D.rectangle(50, 50))
    .build()

  commands
    .spawn()
    .insertPrefab(createRigidBody2D(
      rect.width / 2 - 100,
      400,
      0,
      0.3,
      1,
      1,
      groups.one,
      groups.one
    ))
    .insert(Shape2D.rectangle(50, 50))
    .build()

  commands
    .spawn()
    .insertPrefab(createRigidBody2D(
      rect.width / 2 + 100,
      200,
      0,
      0.3,
      1,
      1,
      groups.one,
      groups.two
    ))
    .insert(Shape2D.rectangle(50, 50))
    .build()

  commands
    .spawn()
    .insertPrefab(createRigidBody2D(
      rect.width / 2 + 100,
      400,
      0,
      0.3,
      0,
      1,
      groups.one,
      groups.one
    ))
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