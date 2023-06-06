import {
  BodyMesh,
  Box,
  Entity
} from "/dist/chaos.es.js"


export function stacking(manager) {
  stack(200, 300, 50, 50, 8, 5, manager)
  manager.getSystem("world").gravity = 980
}

function stack(x, y, w, h, no, spacing, manager) {
  for (var i = 0; i < no; i++) {
    let entity = new BoxEntity(x, y + (h + spacing) * i)
      .attach(new Box(w, h))
      .attach(new BodyMesh())
    manager.add(entity)
  }
}