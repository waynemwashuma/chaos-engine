import {
  rand,
  BodySprite,
  createEntity,
  Box,
  Ball
} from "/src/index.js"

export function random(manager) {
  let world = manager.getSystem("world")


  randomEntities(200, manager)
  world.gravity = 1000
}

function randomEntities(n, manager) {
  const renderer = manager.getSystem("renderer")
  const width = renderer.width,
    height = renderer.height
  for (let i = 0; i < n; i++) {
    let props = rand()
    let x = rand(10, width - 20),
      y = rand(10, height - 20)
    let entity = createEntity(x, y)
      .attach("sprite", new BodySprite())
    if (props <= .50)
      entity.attach("body", new Box(rand(10, 50), rand(5, 40)))
    if (props > .50)
      entity.attach("body", new Ball(rand(5, 20)))
    manager.add(entity)
  }
}