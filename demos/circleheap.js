import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function circleheap(manager) {
  const viewport = manager.getResource("viewport")

  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  const height = 10
  for (let x = 0; x < 10; x++) {
    stack(200 + x * 50, -100, 50, 50, height, 5, manager)
  }

  manager.getResource("gravity").y = 900
}

function stack(x, y, w, h, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    manager.create([
    ...createTransform2D(x, y + (h + spacing) * i),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRigidBody2D(Shape2D.circle(w/2))
    ])
  }
}