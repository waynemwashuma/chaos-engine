import {
  Vector,
  Entity,
  Box,
  BodySprite,
  DistanceConstraint,
  SpringConstraint
} from "/src/index.js"//"/dist/chaos.module.js"

export function constraint(manager) {
  let world = manager.getSystem("world")
  
  let box1 = Entity.Default(200, 300)
  let box2 = Entity.Default(200, 360)

  let body1 = new Box(50, 50)
  let body2 = new Box(50, 50)

  box1.attach("body", body1)
    .attach("mesh", new BodySprite())
  box2.attach("body", body2)
    .attach("mesh", new BodySprite())
  
  let an1 = body1.setAnchor(new Vector(25,-25))
  let an2 = body2.setAnchor(new Vector(-25,-25))
  
  let constraint1 = new DistanceConstraint(body1,body2,body1.getAnchor(an1),body2.getAnchor(an2))
  
  constraint1.stiffness = 1
  manager.add(box1)
  manager.add(box2)
  
  world.gravity = 1000
  world.add(constraint1)
}