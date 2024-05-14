import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function restitution(manager) {
  const viewport = manager.getResource("viewport")
  
  stackHorizontal(100, 500, 50, 50, 5, 100, manager)
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}

function stackHorizontal(x, y, w, h, no, spacing, manager) {
  for (let i = 1; i <= no; i++) {
    manager.create([
    ...createTransform2D(x + (w + spacing) * i, y),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRawRigidBody2D(Shape2D.rectangle(w, h),1,i/no),
    ])
  }
}