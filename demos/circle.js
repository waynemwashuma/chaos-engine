import {
  Transform,
  Movable,
  BoundingBox,
  Ball,
  Sprite,
  CircleGeometry,
  BasicMaterial,
} from  "/src/index.js"
import {makePlatform} from "./utils.js"

export function circle(manager) {
  const rect = manager.getResource("renderer")
  manager.create({
    "transform": new Transform(rect.width/2, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": new Ball(30),
    "sprite": new Sprite(
      new CircleGeometry(30),
      new BasicMaterial()
    )
  })
  makePlatform(
    manager,
    rect.width/2,
    rect.height * 0.8,
    rect.width,
    50)
  manager.getResource("gravity").y = 900
}