import {
  Transform,
  Movable,
  BoundingBox,
  Body2D,
  Rectangle,
  Circle,
  Sprite,
  BoxGeometry,
  CircleGeometry,
  BasicMaterial,
  degToRad
} from "/src/index.js"
export function friction(manager) {
  const body1 = new Body2D(new Rectangle (300, 20))
  const body2 = new Body2D(new Rectangle (300, 20))
  manager.create([
    new Transform(200, 300,Math.PI/9),
    new Movable(),
    new BoundingBox(),
    body1,
    new Sprite(
    new BoxGeometry(300, 20),
    new BasicMaterial()
  )
  ])
  manager.create([
    new Transform(200, 200, Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    body2,
    new Sprite(
    new BoxGeometry(300, 20),
    new BasicMaterial()
  )
  ])
  manager.create([
    new Transform(100, 100, Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    new Body2D(new Rectangle (50, 50)),
    new Sprite(
    new BoxGeometry(50, 50),
    new BasicMaterial()
  )
  ])
  manager.create([
    new Transform(100, 237, Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    new Body2D(new Circle(15)),
    new Sprite(
    new CircleGeometry(15),
    new BasicMaterial()
  )
  ])
  Body2D.setType(body1, Body2D.STATIC)
  Body2D.setType(body2, Body2D.STATIC)

  manager.getResource("gravity").y = 900
}