import { BoxEntity } from "/assets/index.js"
import { Vector } from "/src/index.js"


export function pyramid(manager) {
  stackpyramid(200,300,50,50,3,5,manager)
  manager.getSystem("world").gravity = 980 
}
function stackpyramid(x, y, w, h, no, spacing, manager) {
  let dx = x - (w / 2 * no / 2)
  for (var j = no; j > 0; j--) {
    dx += w / 2
    for (var i = 0; i < j; i++) {
      let entity = new BoxEntity(
        dx + w * i, y + (h + spacing) * j, w, h)
      manager.add(entity)
    }
  }
}