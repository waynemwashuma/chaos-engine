import {
  createEntity,
  Ball,
  BodySprite
} from  "/src/index.js"

export function circle(manager) {
  let world = manager.getSystem("world")
  
  let box = createEntity(200,100)
  let body = new Ball(20)
  
  box.attach("body",body)
  .attach("sprite",new BodySprite())
  manager.add(box)
  world.gravity = 980
}