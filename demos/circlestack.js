import {
  BodySprite,
  Ball,
  createEntity
} from "/src/index.js"


export function circlestacking(manager) {
  stack(200, 300,25, 8, 5, manager)
  manager.getSystem("world").gravity = 980
}

function stack(x, y,r, no, spacing, manager) {
  for (var i = 0; i < no; i++) {
    let entity = createEntity(x, y + (r + spacing) * i)
      .attach("body",new Ball(r))
      .attach("sprite",new BodySprite())
    manager.add(entity)
  }
}