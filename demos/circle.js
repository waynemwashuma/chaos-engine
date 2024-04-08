import {
  Transform,
  Movable,
  BoundingBox,
  Sprite,
  CircleGeometry,
  BasicMaterial,
  createRawRigidBody2D,
  Circle
} from  "/src/index.js"
import {makePlatform} from "./utils.js"
import {viewport} from "./demo.js"

export function circle(manager) {
  manager.create({
    "transform": new Transform(viewport.width/2, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...createRawRigidBody2D(new Circle(30)),
    "sprite": new Sprite(
      new CircleGeometry(30),
      new BasicMaterial()
    )
  })
  makePlatform(
    manager,
    viewport.width/2,
    viewport.height * 0.8,
    viewport.width,
    50)
  manager.getResource("gravity").y = 900
}