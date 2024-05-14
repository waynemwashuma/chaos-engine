import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function box(manager) {
  const rect = manager.getResource("viewport")
  manager.create([
    ...createTransform2D(rect.width/2, 300),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRawRigidBody2D(Shape2D.rectangle(50,50))
  ])
  makePlatform(
    manager,
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
    50)
  manager.getResource("gravity").y = 900
  //console.log(manager)
}