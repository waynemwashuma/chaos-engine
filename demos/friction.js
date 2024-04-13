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
  const body1 = createRawRigidBody2D(new Rectangle(300,20),0)
  const body2 = createRawRigidBody2D(new Rectangle(300,20),0)
  manager.create([
    new Transform(200,300,Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    body1,
    new Sprite(
      new BoxGeometry(300,20),
      new BasicMaterial()
    )
  ])
  manager.create([
    new Transform(200,200,Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    body2,
    new Sprite(
      new BoxGeometry(300,20),
      new BasicMaterial()
    )
  ])
  manager.create([
    new Transform(100,100,Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    ...createRawRigidBody2D(new Rectangle(50,50)),
    new Sprite(
      new BoxGeometry(50,50),
      new BasicMaterial()
    )
  ])
  manager.create([
    new Transform(100,237,Math.PI / 9),
    new Movable(),
    new BoundingBox(),
    ...createRawRigidBody2D(new Circle(15)),
    new Sprite(
      new CircleGeometry(15),
      new BasicMaterial()
    )
  ])
  manager.getResource("gravity").y = 900
}