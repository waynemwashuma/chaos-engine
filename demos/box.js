import {
  Transform,
  Movable,
  BoundingBox,
  Shape2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function box(manager) {
  const rect = manager.getResource("viewport")
  manager.create([
    new Transform(rect.width/2, 300),
    new Movable(0,0),
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