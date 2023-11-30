import {
  createEntity,
  Box,
  BodySprite
} from  "/src/index.js"
export function box(manager) {
  let world = manager.getSystem("world")
  
  let box = createEntity(200,100)
  let body = new Box(50,50)
  
  box.attach("body",body)
  .attach("sprite",new BodySprite())
  manager.add(box)
  world.gravity = 980
}