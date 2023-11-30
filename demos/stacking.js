import {
  BodySprite,
  Box,
  createEntity
} from "/src/index.js"


export function stacking(manager) {
  stack(200, 300, 50, 50, 8, 5, manager)
  manager.getSystem("world").gravity = 980
}

function stack(x, y, w, h, no, spacing, manager) {
  for (var i = 0; i < no; i++) {
    let entity = createEntity(x, y + (h + spacing) * i)
      .attach("body",new Box(w, h))
      .attach("sprite",new BodySprite())
    manager.add(entity)
  }
}