import {
  BoundingBox,
  createTransform2D,
  createMovable2D,
  createRigidBody2D,
  Shape2D
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function circle(manager) {
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
  .spawn()
  .insertPrefab(createRigidBody2D(viewport.width / 2, 300))
  .insert(Shape2D.circle(30))
  .build()
  
  gravity.set(0, 900)
}