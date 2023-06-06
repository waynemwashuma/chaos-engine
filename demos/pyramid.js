import { Box, BodyMesh, Entity, Vector } from "/dist/chaos.es.js"

export function pyramid(manager) {
  stackpyramid(200, 300, 50, 50, 3, 5, manager)
  manager.getSystem("world").gravity = 980
}

function stackpyramid(x, y, w, h, no, spacing, manager) {
  let dx = x - (w / 2 * no / 2)
  for (var j = no; j > 0; j--) {
    dx += w / 2
    for (var i = 0; i < j; i++) {
      let entity = Entity.Default(dx + w * i, y + (h + spacing) * j)
        .attach(new BodyMesh())
        .attach(new Box(x, h))
      manager.add(entity)
    }
  }
}