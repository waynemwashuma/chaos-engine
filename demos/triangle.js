import {
  Transform,
  Movable,
  BoundingBox,
  Shape2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function triangle(manager) {
  const viewport = manager.getResource("viewport")
  const angle = Math.PI / 2
  const base = 200
  manager.create([
    new Transform(viewport.width / 2, 300),
    new Movable(),
    new BoundingBox(),
    ...createRawRigidBody2D(Shape2D.triangle(base, (base / 2) * Math.sin(angle), angle))
  ])
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}