import {
  rand,
  BoundingBox,
  Shape2D,
  createTransform2D,
  createMovable2D,
  createRigidBody2D
} from "chaos-studio"
import { makeContainer } from "./utils.js"

export function random(manager) {
  const viewport = manager.getResource("viewport")
  const commands = manager.getResource("entitycommands")
  const gravity = manager.getResource("gravity")

  commands
    .spawnBatch(makeContainer(
      viewport.width - 100,
      viewport.height * 0.8,
      500,
      50,
      50
    ))

  const maxCount = 30
  let count = 0

  setInterval(() => {
    if (count > maxCount) return
    randomEntities(1, viewport.width, viewport.height, commands)
    count++
  }, 100)

  gravity.set(0,90)
}

function randomEntities(n, width, height, commands) {
  width = width - 100
  height = height - 100

  for (let i = 0; i < n; i++) {
    const x = width / 2,
      y = height * 0.2
    const w = rand(50, 100),
      h = rand(50, 100)
    const body = (rand() <= 0.5) ?
      Shape2D.rectangle(w, h) :
      Shape2D.circle(w / 2)

    commands
      .spawn()
      .insertPrefab(createRigidBody2D(x, y))
      .insert(body)
      .build()
  }
}