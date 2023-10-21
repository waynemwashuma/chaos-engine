import {
  Entity,
  Box,
  BodySprite,
  CamController
} from  "/src/index.js"
export function box(manager) {
  let world = manager.getSystem("world")
  let renderer = manager.getSystem("renderer")
  let cam = new CamController(renderer.camera)
  manager.registerSystem("camcontrol",cam)
  
  let box = Entity.Default(200,100)
  let body = new Box(50,50)
  
  //cam.followEntity(box)
  //cam.setOffset(innerWidth/2,innerHeight/2)
  box.attach("body",body)
  .attach("sprite",new BodySprite())
  manager.add(box)
  world.gravity = 980
  console.log(box.toJson());
}