import {
  Transform,
  Movable,
  BoundingBox,
  Sprite,
  BoxGeometry,
  CircleGeometry,
  BasicMaterial,
  Rectangle,
  Circle,
  createRawRigidBody2D
} from "/src/index.js"
export function friction(manager) {
  const body1 = createRawRigidBody2D(new Rectangle(300, 20),0)
  const body2 = createRawRigidBody2D(new Rectangle(300, 20),0)

  manager.create({
    "transform": new Transform(200, 300, Math.PI/9),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body1,
    "sprite": new Sprite(
      new BoxGeometry(300, 20),
      new BasicMaterial()
    )
  })

  manager.create({
    "transform": new Transform(200, 200, Math.PI/9),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...body2,
    "sprite": new Sprite(
      new BoxGeometry(300, 20),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(100, 100, Math.PI/9),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...createRawRigidBody2D(new Rectangle(50, 20)),
    "sprite": new Sprite(
      new BoxGeometry(50, 20),
      new BasicMaterial()
    )
  })
  manager.create({
    "transform": new Transform(100, 237),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...createRawRigidBody2D(new Circle(15)),
    "sprite": new Sprite(
      new CircleGeometry(15),
      new BasicMaterial()
    )
  })

  manager.getResource("gravity").y = 900
}