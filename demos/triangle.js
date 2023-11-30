import {
  createEntity,
  Trigon,
  BodySprite
} from  "/src/index.js"
export function triangle(manager) {
  let world = manager.getSystem("world")
  let angle = Math.PI/3
  let box = createEntity(200,100,1)
  let body = new Trigon(50,50 * Math.sin(angle),angle)
  
  box.attach("body",body)
  .attach("sprite",new BodySprite())
  manager.add(box)
  world.gravity = 300
}