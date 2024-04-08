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

export function restitution(manager) {
  const rect = manager.getResource("renderer")

  const body1 = createRawRigidBody2D(new Rectangle(50, 50),1,1)
  const body2 = createRawRigidBody2D(new Rectangle(50, 50),1,0.8)
  const body3 = createRawRigidBody2D(new Rectangle(50, 50),1,0.6)
  const body4 = createRawRigidBody2D(new Rectangle(50, 50),1,0.4)
  const body5 = createRawRigidBody2D(new Rectangle(50, 50),1,0.2)
  const body6 = createRawRigidBody2D(new Rectangle(50, 50),1,0)
  
  manager.create({
    "transform": new Transform(100, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body1,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(200, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body2,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(300, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body3,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(400, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body4,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(500, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body5,
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(600, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body6,
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