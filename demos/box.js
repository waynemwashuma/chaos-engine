import {
  Vector,
  DistanceConstraint,
  Entity,
  Box,
  Ball,
  Composite,
  BodySprite
} from  "/dist/chaos.module.js"
export function box(manager) {
  let world = manager.getSystem("world")
  
  let box = Entity.Default(200,100)
  let body = new Box(50,50)
  
  box.attach("body",body)
  .attach("mesh",new BodySprite())
  manager.add(box)
  world.gravity = 980
}