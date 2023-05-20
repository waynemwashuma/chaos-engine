import { CanvasBounds, BallEntity, BoxEntity, Bound, Raycastor } from "/assets/index.js"
import { Vector, Manager, DebugMesh, Box, SpringConstraint } from "/src/index.js"

let manager = new Manager()

let bounds = new CanvasBounds()
let pin = new BoxEntity(new Vector(200, 100), 20, 20)
let chain1 = new BoxEntity(new Vector(200, 150), 100, 10)
let chain2 = new BoxEntity(new Vector(200, 250), 100, 10)
let chain3 = new BoxEntity(new Vector(200, 350), 100, 10)
let chain4 = new BoxEntity(new Vector(200, 450), 100, 10)
let constraint1 = new SpringConstraint(pin.body, chain1.body, null, { x: -50, y: 0 })
let constraint2 = new SpringConstraint(chain1.body, chain2.body, { x: 50, y: 0 }, { x: -50, y: 0 })
let constraint3 = new SpringConstraint(chain2.body, chain3.body, { x: 50, y: 0 }, { x: -50, y: 0 })
let constraint4 = new SpringConstraint(chain3.body, chain4.body, { x: 50, y: 0 }, { x: -50, y: 0 })

pin.body.layer = 1
chain1.body.layer = 2
chain2.body.layer = 3
chain3.body.layer = 4
chain4.body.layer = 5
pin.body.mass = 0

chain1.angle = 90
chain2.angle = 90
chain3.angle = 90
chain4.angle = 90
manager.bindTo("#can")
manager.renderer.add(new DebugMesh(manager))
//manager.add(new CanvasBounds())
manager.add(chain1)
manager.add(chain2)
manager.add(chain3)
manager.add(chain4)
manager.add(pin)
manager.world.addConstraint(constraint1)
manager.world.addConstraint(constraint2)
manager.world.addConstraint(constraint3)
manager.world.addConstraint(constraint4)

manager.world.gravity = { x: 0, y: 980 }