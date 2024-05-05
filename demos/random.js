import {
  rand,
  Transform,
  Movable,
  BoundingBox,
  Shape2D,
  createRawRigidBody2D
} from "/src/index.js"
import { makeContainer } from "./utils.js"

export function random(manager) {
  const viewport = manager.getResource("viewport")
  const maxCount = 30
  let count = 0
  setInterval(() => {
    if (count > maxCount) return
    randomEntities(
      1,
      viewport.width,
      viewport.height,
      manager
    )
    count++
  }, 100)
  makeContainer(
    manager,
    viewport.width - 100,
    viewport.height * 0.8,
    500,
    50,
    50
  )
  manager.getResource("gravity").y = 900
}

function randomEntities(n, width, height, manager) {
  width = width - 100
  height = height - 100
  
  for (let i = 0; i < n; i++) {
    const props = rand()
    const x = width / 2,
      y = height * 0.2,
      w = rand(50, 100),
      h = rand(50, 100)
    const body = (props <= 0.5) ?
      createRawRigidBody2D(Shape2D.rectangle(w, h)) :
      createRawRigidBody2D(Shape2D.circle(w / 2))
    manager.create([
      new Transform(x, y),
      new Movable(),
      new BoundingBox(),
      ...body
    ])

  }
}