import { CanvasBounds, BoxEntity, BallEntity } from "/assets/index.js"
import { Vector, Manager, DebugMesh, Box, Ball, SpringConstraint, rand, Entity, BodyMesh } from "/src/index.js"

export function bridge() {
  let manager = Manager.Default()
  let world = manager.getSystem("world")

  world.gravity = 1000

  let pin1 = new BoxEntity(100, 200, 20, 20)
  let pin2 = new BoxEntity(350, 200, 20, 20)
  let chain = createChain(50, 200, 50, 10, 5, 50, pin1, pin2)

  pin1.get("body").mass = 0
  pin2.get("body").mass = 0

  manager.add(pin1)
  manager.add(pin2)
  chain.bodies.forEach(b => manager.add(b))
  chain.constraints.forEach(b => world.addConstraint(b))
}

function createChain(x, y, w, h, number, spacing, pin1, pin2) {
  let prev = new Box(w, h),
    bodies = [
      Entity.Default(x * i, y)
      .attach("body", prev)
      .attach("mesh", new BodyMesh())
      ],
    constraints = []
    
  prev.mask.group = 1
  
  for (var i = 1; i < number; i++) {
    let chain = new Box(w, h)
    let constraint = new SpringConstraint(prev, chain, { x: w / 2, y: 0 }, { x: -w / 2, y: 0 })
    
    bodies.push(
      Entity.Default(x * i, y)
      .attach("body", chain)
      .attach("mesh", new BodyMesh())
    )
    constraints.push(constraint)
    chain.mask.group = 1
    prev = chain
  }
  if (pin1) {
    let constraint = new SpringConstraint(pin1.get("body"), bodies[0].get("body"), { x: 0, y: 0 }, { x: -w / 2, y: 0 })
    constraints.push(constraint)
    pin1.get("body").mask.group = 1
  }
  if (pin2) {
    let constraint = new SpringConstraint(
      pin2.get("body"),
      bodies[bodies.length - 1].get("body"), { x: 0, y: 0 }, { x: w / 2, y: 0 }
    )
    constraints.push(constraint)
    pin2.get("body").mask.group = 1
  }
  return {
    bodies,
    constraints
  }
}