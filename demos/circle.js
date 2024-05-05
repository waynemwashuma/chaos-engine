import {
  Transform,
  Movable,
  BoundingBox,
  createRawRigidBody2D,
  Shape2D
} from  "/src/index.js"
import {makePlatform} from "./utils.js"

export function circle(manager) {
    const viewport = manager.getResource("viewport")

  manager.create([
    new Transform(viewport.width/2, 300),
    new Movable(),
    new BoundingBox(),
    ...createRawRigidBody2D(Shape2D.circle(30))
  ])
  makePlatform(
    manager,
    viewport.width/2,
    viewport.height * 0.8,
    viewport.width,
    50)
  manager.getResource("gravity").y = 900
}