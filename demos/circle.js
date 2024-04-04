import {
  Transform,
  Movable,
  BoundingBox,
  Body2D,
  Circle,
  Sprite,
  CircleGeometry,
  BasicMaterial,
} from  "/src/index.js"
import {makePlatform} from "./utils.js"
import {viewport} from "./demo.js"

export function circle(manager) {
  manager.create([
    new Transform(viewport.width/2, 300),
    new Movable(),
    new BoundingBox(),
    new Body2D(new Circle(30)),
    new Sprite(
      new CircleGeometry(30),
      new BasicMaterial()
    )
  ])
  makePlatform(
    manager,
    viewport.width/2,
    viewport.height * 0.8,
    viewport.width,
    50)
  manager.getResource("gravity").y = 900
}