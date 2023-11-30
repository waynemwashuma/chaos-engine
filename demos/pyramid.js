import {
  Box,
  BodySprite,
  createEntity
} from "/src/index.js"

export function pyramid(manager) {
  stackpyramid(200, 100, 50, 50, 3, 5, manager)
  manager.getSystem("world").gravity = 980
}

function stackpyramid(x, y, w, h, no, spacing, manager) {
  let dx = x - (w / 2 * no / 2)
  for (var j = no; j > 0; j--) {
    dx += w / 2
    for (var i = 0; i < j; i++) {
      let entity = createEntity(dx + w * i, y + (h + spacing) * j)
        .attach("sprite", new BodySprite())
        .attach("body", new Box(w, h))
      manager.add(entity)
    }
  }
}