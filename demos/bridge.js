import {
  Vector2,
  Box,
  DistanceConstraint,
  createEntity,
  BodySprite
} from "/src/index.js"

export function bridge(manager) {
  let world = manager.getSystem("world")

  world.gravity = 1000
  
  let pin1 = createEntity(100, 200)
    .attach("body2d",new Box(20, 20))
    .attach("sprite",new BodySprite())
  let pin2 = createEntity(350, 200)
    .attach("body2d",new Box(20, 20))
    .attach("sprite",new BodySprite())
  let chain = createChain(50, 200, 50, 10, 5, 50, pin1, pin2)

  pin1.get("body2d").mass = 0
  pin2.get("body2d").mass = 0

  manager.add(pin1)
  manager.add(pin2)
  chain.bodies.forEach(b => manager.add(b))
  chain.constraints.forEach(b => world.addConstraint(b))
}

function createChain(x, y, w, h, number, spacing, pin1, pin2) {
  let prev = new Box(w, h),
    bodies = [
      createEntity(x, y)
      .attach("body2d", prev)
      .attach("sprite", new BodySprite())
      ],
    constraints = []

  prev.mask.group = 1

  for (var i = 1; i < number; i++) {
    let chain = new Box(w, h)
    let an1 = prev.setAnchor(new Vector2(w/2,0))
    let an2 = prev.setAnchor(new Vector2(w/2,0))
    let constraint = new DistanceConstraint(prev, chain,  prev.getAnchor(an1),chain.getAnchor(an2))

    bodies.push(
      createEntity(x * i, y)
      .attach("body2d", chain)
      .attach("sprite", new BodySprite())
    )
    constraints.push(constraint)
    chain.mask.group = 1
    prev = chain
  }
  if (pin1) {
    let an1 = pin1.get("body2d").setAnchor(new Vector2(0,0))
    let an2 = bodies[0].get("body2d").setAnchor(new Vector2(-w/2,0))
    let constraint = new DistanceConstraint(pin1.get("body2d"), bodies[0].get("body2d"), pin1.get("body2d").getAnchor(an1),  bodies[0].get("body2d").getAnchor(an2))
    constraints.push(constraint)
    pin1.get("body2d").mask.group = 1
  }
  if (pin2) {
    let an1 = pin2.get("body2d").setAnchor(new Vector2(0,0))
    let an2 = bodies[bodies.length - 1].get("body2d").setAnchor(new Vector2(w/2,0))
    let constraint = new DistanceConstraint(pin2.get("body2d"), bodies[bodies.length - 1].get("body2d"), pin2.get("body2d").getAnchor(an1),  bodies[bodies.length - 1].get("body2d").getAnchor(an2))
    constraints.push(constraint)
    pin2.get("body2d").mask.group = 1
  }
  return {
    bodies,
    constraints
  }
}