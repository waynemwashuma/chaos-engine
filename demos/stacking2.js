import { CanvasBounds, BallEntity, BoxEntity, Bound, Raycastor } from "/assets/index.js"
import { Vector, Manager, DebugMesh, Box, SpringConstraint,rand } from "/src/index.js"

let manager = new Manager()
let bounds = new CanvasBounds()

manager.bindTo("#can")
manager.renderer.add(new DebugMesh(manager))
manager.add(new CanvasBounds())

manager.world.gravity = { x: 0, y: 980 }

setInterval(e=>{
  let load = new BoxEntity(new Vector(100,200),30,30)
  manager.add(load)
  load.angle = 20
},500)