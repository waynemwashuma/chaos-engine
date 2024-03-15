import {
  Transform,
  Movable,
  BoundingBox,
  Box,
  Ball,
  Sprite,
  BoxGeometry,
  CircleGeometry,
  BasicMaterial,
  Body2D,
  degToRad
} from "/src/index.js"
export function friction(manager) {
  const body1 = new Box(300, 20)
  const body2 = new Box(300, 20)

  manager.create({
    "transform": new Transform(200, 300, degToRad(20)),
    "movable": new Movable(),
    "bounds": new BoundingBox(),
    "body": body1,
    "sprite": new Sprite(
      new BoxGeometry(300, 20),
      new BasicMaterial()
    )
  })

  manager.create({
    "transform": new Transform(200, 200, degToRad(20)),
    "movable": new Movable(),
    "bounds": new BoundingBox(),
    "body": body2,
    "sprite": new Sprite(
      new BoxGeometry(300, 20),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(100, 100, degToRad(20)),
    "movable": new Movable(),
    "bounds": new BoundingBox(),
    "body": new Box(50, 20),
    "sprite": new Sprite(
      new BoxGeometry(50, 20),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(100, 237),
    "movable": new Movable(),
    "bounds": new BoundingBox(),
    "body": new Ball(15),
    "sprite": new Sprite(
      new CircleGeometry(15),
      new BasicMaterial()
    )
  })

  body1.type = Body2D.STATIC
  body2.type = Body2D.STATIC

  manager.getResource("world").gravity = 980
}