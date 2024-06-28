import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D,
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
        ...createTransform2D(
          dx + w * i,
          y + (h + spacing) * j
        ),
        ...createMovable2D(),
        new BoundingBox(),
        ...createRigidBody2D(Shape2D.rectangle(w,h))
      ])
    }
  }
}