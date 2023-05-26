import { BallEntity, BoxEntity } from "/assets/index.js"
import { Manager, Vector, rand } from "/src/index.js"

export function random(manager) {
  let world = manager.getSystem("world")

  randomEntities(50, manager)

  world.gravity = 1000

}

function randomEntities(n, manager) {
  for (let i = 0; i < n; i++) {
    let pos = new Vector(rand(100, 300), rand(100, 500))
    let props = rand()
    let entity
    if (props <= .50)
      entity = new BoxEntity(...pos, rand(10, 50), rand(5, 40))
    if (props > .50)
      entity = new BallEntity(...pos, rand(5, 20), rand(10, 50))
    manager.add(entity)
  }
}