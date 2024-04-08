import {
  Transform,
  Movable,
  BoundingBox,
  Sprite,
  BoxGeometry,
  BasicMaterial,
  Rectangle,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"

export function box(manager) {
  const rect = manager.getResource("renderer")
  
  manager.create({
    "transform": new Transform(1000, 300), //,Math.PI/9),
    "movable": new Movable(0,0),
    "bound": new BoundingBox(),
    ...createRawRigidBody2D(new Rectangle(50,50)),
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  makePlatform(
    manager,
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
    50)
  manager.getResource("gravity").y = 900
}
