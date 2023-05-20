import { CanvasBounds, BallEntity } from "/assets/index.js"
import { Vector, Manager, DebugMesh, rand} from "/src/index.js"
import { QuadTreeBroadphase } from "/src/physics/broadphases/index.js"
let manager = new Manager()
let bounds = new CanvasBounds()

manager.bindTo("#can")
manager.world.broadphase = new QuadTreeBroadphase({
  max: {
    x: 400,
    y: 730
  },
  min: {
    x: 0,
    y: 0
  }
}, 5)
manager.renderer.add(new DebugMesh(manager))
manager.add(new CanvasBounds())

setInterval(e => {
  let load = new BallEntity(new Vector(50, 200), 10, 10)
  load.angle = 20
  if (manager.objects.length < 250)
    manager.add(load)
}, 100)