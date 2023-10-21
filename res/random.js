import {
  Manager,
  Vector,
  rand,
  BodySprite,
  Entity,
  Box,
  Ball
} from "/src/index.js"

export function random(manager) {
  let world = manager.getSystem("world")
  randomEntities(50, manager)
  world.gravity = 1000
}

function randomEntities(n, manager) {
  for (let i = 0; i < n; i++) {
    let props = rand()
    let entity = Entity.Default(rand(100, 300), rand(100, 500))
      .attach("sprite",new BodySprite())
    if (props <= .50)
      entity.attach("body",new Box(rand(10, 50), rand(5, 40)))
    if (props > .50)
      entity.attach("body",new Ball(rand(5, 20)))
    manager.add(entity)
  }
}