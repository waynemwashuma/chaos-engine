import {
  Transform,
  Movable,
  BoundingBox,
  Rectangle,
  Sprite,
  BoxGeometry,
  BasicMaterial,
  createRawRigidBody2D,
} from "/src/index.js"
import { makePlatform } from "./utils.js"
import {viewport} from "./demo.js"

export function pyramid(manager) {
  const viewX = viewport.width / 2
  stackpyramid(viewX, 100, 50, 50, 10, 0, manager)
  manager.getResource("gravity").y = 900

  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
}

function stackpyramid(x, y, w, h, no, spacing, manager) {
  let dx = x - (w / 2 * no)
  for (var j = no; j > 0; j--) {
    dx += w / 2
    for (var i = 0; i < j; i++) {
      manager.create({
        "transform": new Transform(
          dx + w * i,
          y + (h + spacing) * j
        ),
        "movable": new Movable(),
        "bound": new BoundingBox(),
        ...createRawRigidBody2D(new Rectangle(w,h)),
        "sprite": new Sprite(
          new BoxGeometry(w, h),
          new BasicMaterial()
        )
      })
    }
  }
}