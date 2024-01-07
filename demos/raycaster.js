import {
  createEntity,
  Body,
  Box,
  Ball,
  Trigon,
  rand,
  Raycaster
} from "/src/index.js"
export function raycaster(manager) {
  let world = manager.getSystem("world")
  let renderer = manager.getSystem("renderer")
  for (let x = 150; x < renderer.width - 100; x += 80) {
    for (var y = 100; y < renderer.height - 100; y += 80) {
      const box = createBox(x, y)
      manager.add(box)
    }
  }

  
  let raycaster = createEntity(renderer.width/2 + 50, renderer.height / 2, -60)
    .attach("raycaster", new Raycaster(10,Math.PI/20))
  world.gravity = 0
  manager.add(raycaster)

  setInterval(() => {
    raycaster.get("transform").orientation.value += 0.001
  })
}

function createBox(x, y) {
  let box = createEntity(x, y),
    body, probs = rand()
  if (probs <= 0.33)
    body = new Ball(20)
  else if (probs > 0.33 && probs <= 0.67)
    body = new Box(50, 50)
  else
    body = new Trigon(50, 50, Math.PI / 3)
  body.type = Body.STATIC
  box.attach("body", body)
  return box
}