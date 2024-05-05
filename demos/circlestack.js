import {
  Transform,
  Movable,
  BoundingBox,
  Shape2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function circlestacking(manager) {
  const viewport = manager.getResource("viewport")

  stack(200, 300, 25, 8, 5, manager)
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}

function stack(x, y, r, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    manager.create([
      new Transform(x, y + (r * 2 + spacing) * i),
      new Movable(),
      new BoundingBox(),
      ...createRawRigidBody2D(Shape2D.circle(r))
    ])
  }
}