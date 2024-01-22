import {
  createEntity,
  Box,
  Ball,
  BodySprite,
  Body2D
} from  "/src/index.js"
export function friction(manager) {
  let world = manager.getSystem("world")
  
  let floor1 = createEntity(200,300,20)
  let body1 = new Box(300,20)
  let entity1 = createEntity(100,237)
  let body2 = new Ball(15)
  let floor2 = createEntity(200,200,20)
  let body3 = new Box(300,20)
  let entity2 = createEntity(100,100,20)
  let body4 = new Box(50,30)
  
  body1.type = Body2D.STATIC
  body3.type = Body2D.STATIC
  
  floor1.attach("body",body1)
  .attach("sprite",new BodySprite())
  entity1.attach("body",body2)
  .attach("sprite",new BodySprite())
  floor2.attach("body",body3)
  .attach("sprite",new BodySprite())
  entity2.attach("body",body4)
  .attach("sprite",new BodySprite())
  
  manager.add(floor1)
  manager.add(entity1)
  manager.add(floor2)
  manager.add(entity2)
  
  world.gravity = 980
}