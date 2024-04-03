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
import {viewport} from "./demo.js"
export function restitution(manager) {

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
    "boundingbox": new BoundingBox(),
    "body2d": body1,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(200, 300),
    "movable": new Movable(),
    "boundingbox": new BoundingBox(),
    "body2d": body2,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(300, 300),
    "movable": new Movable(),
    "boundingbox": new BoundingBox(),
    "body2d": body3,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(400, 300),
    "movable": new Movable(),
    "boundingbox": new BoundingBox(),
    "body2d": body4,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(500, 300),
    "movable": new Movable(),
    "boundingbox": new BoundingBox(),
    "body2d": body5,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(600, 300),
    "movable": new Movable(),
    "boundingbox": new BoundingBox(),
    "body2d": body6,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}