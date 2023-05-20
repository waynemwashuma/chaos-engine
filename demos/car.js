import { CanvasBounds, BallEntity, BoxEntity,Raycastor } from "/assets/index.js"
import { Vector,Manager,DebugMesh,Box,SpringConstraint } from "/src/index.js"

let manager = new Manager()

let tireSize = 20
let bounds = new CanvasBounds()
let tire1 = new BallEntity(new Vector(160,285), tireSize)
let tire2 = new BallEntity(new Vector(240,275), tireSize)
let load = new BoxEntity(new Vector(200,50), 100,50)
let car = new BoxEntity(new Vector(200,250), 100,50)
car.body.mask.group = 3
tire1.mask.body.group = 3
tire2.mask.body.group = 3
let constraint1 = new SpringConstraint(car.body,tire1.body,{x:30,y:25})
let constraint2 = new SpringConstraint(car.body,tire2.body,{x:-30,y:25})


manager.bindTo("#can")
manager.renderer.add(new DebugMesh(manager))

manager.add(new CanvasBounds())
manager.add(car)
manager.add(tire1)
manager.add(tire2)
//manager.add(load)
manager.world.addConstraint(constraint1)
manager.world.addConstraint(constraint2)

manager.world.gravity = {x:0,y:980}