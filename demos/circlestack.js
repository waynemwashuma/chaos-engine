import {
  Transform,
  Movable,
  BoundingBox,
  Ball,
  Sprite,
  CircleGeometry,
  BasicMaterial,
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function circlestacking(manager) {
  const rect = manager.getResource("renderer")
  stack(200, 300, 25, 8, 5, manager)
  makePlatform(
    manager,
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
    50
  )
  manager.getResource("world").gravity = 980
}

function stack(x, y, r, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    manager.create({
      "transform": new Transform(x, y + (r + spacing) * i),
      "movable": new Movable(),
      "bounds": new BoundingBox(),
      "body": new Ball(r),
      "sprite": new Sprite(
        new CircleGeometry(r),
        new BasicMaterial()
      )
    })
  }
}