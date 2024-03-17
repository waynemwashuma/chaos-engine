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

export function restitution(manager) {
  const rect = manager.getResource("renderer")

  let body1 = new Box(50, 50)
  let body2 = new Box(50, 50)
  let body3 = new Box(50, 50)
  let body4 = new Box(50, 50)
  let body5 = new Box(50, 50)
  let body6 = new Box(50, 50)

  body1.restitution = 1
  body2.restitution = 0.8
  body3.restitution = 0.6
  body4.restitution = 0.4
  body5.restitution = 0.2
  body6.restitution = 0

  manager.create({
    "transform": new Transform(100, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": body1,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(200, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": body2,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(300, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": body3,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(400, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": body4,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(500, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": body5,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(600, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    "body": body6,
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
    50
  )
  manager.getResource("gravity").y = 900
}