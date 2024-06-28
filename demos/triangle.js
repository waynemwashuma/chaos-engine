import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function triangle(manager) {
  const viewport = manager.getResource("viewport")
  const angle = Math.PI / 2
  const base = 200
  manager.create([
    ...createTransform2D(viewport.width / 2, 300),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRigidBody2D(Shape2D.triangle(base, (base / 2) * Math.sin(angle), angle))
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