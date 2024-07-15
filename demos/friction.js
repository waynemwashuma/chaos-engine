import {
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
export function friction(manager) {
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")

  commands
    .spawn()
    .insertPrefab(createRigidBody2D(200, 300, Math.PI / 9, 0))
    .insert(Shape2D.rectangle(300, 20))
    .build()
  commands
    .spawn()
    .insertPrefab(createRigidBody2D(200, 200, Math.PI / 9, 0))
    .insert(Shape2D.rectangle(300, 20))
    .build()
  commands
    .spawn()
    .insertPrefab(createRigidBody2D(100, 100, Math.PI / 9))
    .insert(Shape2D.rectangle(50, 50))
    .build()
  commands
    .spawn()
    .insertPrefab(createRigidBody2D(100, 237, Math.PI / 9))
    .insert(Shape2D.circle(15))
    .build()

  gravity.set(0, 900)
}