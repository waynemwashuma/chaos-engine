import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRawRigidBody2D,
  SpawnCommand
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function box(manager) {
  const rect = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  
  const collider = Shape2D.rectangle(50, 50)
  const mass = 1
  const inertia = Shape2D.calcInertia(collider, mass)
  
  commands
    .spawn()
    .insertPrefab(
      createTransform2D(rect.width / 2, 400, Math.PI / 3.99))
    .insertPrefab(createMovable2D())
    .insertPrefab(createRawRigidBody2D(mass, inertia))
    .insert(new BoundingBox())
    .insert(collider)
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
  manager.getResource("gravity").y = 900
}