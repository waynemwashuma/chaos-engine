import {
  Transform,
  Movable,
  BoundingBox,
  Box,
  Sprite,
  BoxGeometry,
  BasicMaterial
} from "/src/index.js"
import {makePlatform} from "./utils.js"

export function stacking(manager) {
  stack(200, 300, 50, 50, 8, 5, manager)
  const rect = manager.getResource("renderer")
  manager.getResource("world").gravity = 980
  makePlatform(
    manager,
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
    50
  )
}

function stack(x, y, w, h, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    manager.create({
      "transform": new Transform(x, y + (h + spacing) * i),
      "movable": new Movable(),
      "bounds": new BoundingBox(),
      "body": new Box(w, h),
      "sprite": new Sprite(
        new BoxGeometry(w, h),
        new BasicMaterial()
      )
    })
  }
}