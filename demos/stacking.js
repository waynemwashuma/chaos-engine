import { BoxEntity } from "/assets/index.js"
import { Vector } from "/src/index.js"


export function stacking(manager) {
  stack(200, 300, 50, 50, 8, 5, manager)
  manager.getSystem("world").gravity = 980
}

function stack(x, y, w, h, no, spacing, manager) {
  for (var i = 0; i < no; i++) {
    let entity = new BoxEntity(x, y + (h + spacing) * i, w, h)
    manager.add(entity)
  }
}