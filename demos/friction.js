import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "/src/index.js"
export function friction(manager) {
  const body1 = createRigidBody2D(Shape2D.rectangle(300,20),0)
  const body2 = createRigidBody2D(Shape2D.rectangle(300,20),0)
  manager.create([
    ...createTransform2D(200,300,Math.PI / 9),
    ...createMovable2D(),
    new BoundingBox(),
    ...body1
  ])
  manager.create([
    ...createTransform2D(200,200,Math.PI / 9),
    ...createMovable2D(),
    new BoundingBox(),
    ...body2
  ])
  manager.create([
    ...createTransform2D(100,100,Math.PI / 9),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRigidBody2D(Shape2D.rectangle(50,50))
  ])
  manager.create([
    ...createTransform2D(100,237,Math.PI / 9),
    ...createMovable2D(),
    new BoundingBox(),
    ...createRigidBody2D(Shape2D.circle(15))
  ])
  manager.getResource("gravity").y = 900
}