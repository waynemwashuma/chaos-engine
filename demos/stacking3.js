import { CanvasBounds, BallEntity, BoxEntity } from "/assets/index.js"
import { Vector, Manager, DebugMesh, rand, Renderer, World, AudioHandler, Mesh } from "/src/index.js"
import { QuadTreeBroadphase, AABBBroadphase } from "/src/physics/broadphases/index.js"

let manager = Manager.Default()
let events = manager.getSystem("events")
let renderer = manager.getSystem("renderer")
let world = manager.getSystem("world")

renderer.bindTo("#can")
renderer.setViewport(innerWidth, innerHeight)
manager.registerSystem("events", events)
manager.registerSystem("world", world)
manager.registerSystem("renderer", renderer)
world.gravity = 1000

let bounds = new CanvasBounds()
let stats = new DebugMesh(manager)



let b = new BallEntity(new Vector(200, 600), 50, 50)

//b.get("movable").rotation.degree = 200
//b.get("movable").velocity.x = 200

//stack(200, 200, 30, 30,10, 20, manager)
randomEntities(48, manager)
//manager.add(b)
manager.add(bounds)
renderer.addUI(stats)

window.addEventListener("resize", e => {
  renderer.setViewport(innerWidth, innerHeight)
})



//manager.pause()
//manager.update(0.016)









function randomEntities(n, manager) {
  for (let i = 0; i < n; i++) {
    let pos = new Vector(rand(100, 300), rand(100, 300))
    let props = rand()
    let entity
    if (props <= .50)
      entity = new BallEntity(pos, 20, 20)
    if (props > .50)
      entity = new BallEntity(pos, 20, 20)

    //entity.get("movable").velocity.set(rand(-300, 300), rand(-300, 300))
    manager.add(entity)

  }
}

function stack(x, y, w, h, no, spacing, manager) {
  for (var i = 0; i < no; i++) {
    let entity = new BoxEntity(new Vector(
      x, y + (h + spacing) * i), w, h)
    manager.add(entity)
  }
}

function pyramid(x, y, w, h, no, spacing, manager) {
  let dx = x - (w / 2 * no / 2)
  for (var j = no; j > 0; j--) {
    dx += w / 2
    for (var i = 0; i < j; i++) {
      let entity = new BoxEntity(new Vector(
        dx + w * i, y + (h + spacing) * j), w, h)
      manager.add(entity)
    }
  }
}