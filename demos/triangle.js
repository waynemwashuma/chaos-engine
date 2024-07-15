import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
import { makePlatform } from "./utils.js"

export function triangle(manager) {
  const viewport = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")
  
  const angle = Math.PI / 2
  const base = 200
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
    .spawn()
    .insertPrefab(createRigidBody2D(viewport.width / 2, 300))
    .insert(Shape2D.triangle(base, (base / 2) * Math.sin(angle), angle))
    .build()

  gravity.set(0, 900)
}