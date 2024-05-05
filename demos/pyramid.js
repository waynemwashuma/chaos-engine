import {
  Transform,
  Movable,
  BoundingBox,
  Shape2D,
  createRawRigidBody2D,
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function pyramid(manager) {
  const viewport = manager.getResource("viewport")
  const viewX = viewport.width / 2
  stackpyramid(viewX,100,50,50,10,0,manager)
  manager.getResource("gravity").y = 900

  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
}

function stackpyramid(x,y,w,h,no,spacing,manager) {
  let dx = x - (w / 2 * no)
  for (var j = no; j > 0; j--) {
    dx += w / 2
    for (var i = 0; i < j; i++) {
      manager.create([
        new Transform(
          dx + w * i,
          y + (h + spacing) * j
        ),
        new Movable(),
        new BoundingBox(),
        ...createRawRigidBody2D(Shape2D.rectangle(w,h))
      ])
    }
  }
}