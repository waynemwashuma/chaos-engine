import {
  createEntity,
  Body,
  Box,
  BodySprite,
  RaycastManager,
  Raycaster
} from "/src/index.js"
export function raycaster(manager) {
  let world = manager.getSystem("world")
  let renderer = manager.getSystem("renderer")
  for (let x = 150; x < renderer.width - 100; x+= 80) {
      for (var y = 100; y < renderer.height - 100; y += 80) {
        const box = createBox(x, y)
        manager.add(box)
      }
    }
    
    manager.registerSystem("raycaster",new RaycastManager())
    let raycaster = createEntity(60,renderer.height/2,0)
    .attach("raycaster",new Raycaster(1))
    world.gravity = 0
    manager.add(raycaster)
  }

  function createBox(x, y) {
    let box = createEntity(x, y)
    let body = new Box(50, 50)

    body.type = Body.STATIC
    box.attach("body", body)
    return box
  }