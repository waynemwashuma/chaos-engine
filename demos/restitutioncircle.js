import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function circlerestitution(manager) {
const viewport = manager.getResource("viewport")
  stackHorizontal(100, 500, 25, 5, 100, manager)
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}

function stackHorizontal(x, y, r, no, spacing, manager) {
  for (let i = 1; i <= no; i++) {
    manager.create([
    ...createTransform2D(x + (r + spacing) * i, y),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRigidBody2D(Shape2D.circle(r),1,i/no)
    ])
  }
}