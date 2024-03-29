import {
  Transform,
  Movable,
  BoundingBox,
  Box,
  Sprite,
  BoxGeometry,
  BasicMaterial
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function pyramid(manager) {
  const rect = manager.getResource("renderer")
  const viewX = rect.width / 2
  stackpyramid(viewX, 100, 50, 50, 10, 0, manager)
  manager.getResource("gravity").y = 900

  makePlatform(
    manager,
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
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
        "body": new Box(w, h),
        "sprite": new Sprite(
          new BoxGeometry(w, h),
          new BasicMaterial()
        )
      })
    }
  }
}