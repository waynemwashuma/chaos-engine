import {
  Manager,
  Vector,
  rand,
  BodySprite,
  Entity,
  Box,
  Ball
} from "/dist/chaos.module.js"

export function random(manager) {
  let world = manager.getSystem("world")
  randomEntities(100, manager)
  world.gravity = 1000
}

function randomEntities(n, manager) {
  for (let i = 0; i < n; i++) {
    let props = 0.8 // rand()
    let entity = Entity.Default(rand(100, 300), rand(100, 500))
      .attach("mesh",new BodySprite())
    if (props <= .50)
      entity.attach("body",new Box(rand(10, 50), rand(5, 40)))
    if (props > .50)
      entity.attach("body",new Ball(rand(5, 20)))
    manager.add(entity)
  }
}