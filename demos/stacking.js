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

export function stacking(manager) {
  const rect = manager.getResource("renderer")
  makePlatform(
    manager,
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
    50
  )
  stack(200, 100, 50, 50, 12, 5, manager)
  stack(400, 100, 50, 50, 10, 5, manager)
  stack(600, 100, 50, 50, 8, 5, manager)
  stack(800, 100, 50, 50, 6, 5, manager)
  stack(1000, 100, 50, 50, 4, 5, manager)
  
  manager.getResource("gravity").y = 900
}

function stack(x, y, w, h, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    manager.create({
      "transform": new Transform(x, y + (h + spacing) * i),
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