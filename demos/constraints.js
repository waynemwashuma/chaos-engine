import {
  Vector2,
  createEntity,
  Box,
  BodySprite,
  DistanceConstraint,
} from "/src/index.js"//"/dist/chaos.module.js"

export function constraint(manager) {
  let world = manager.getSystem("world")
  
  let box1 = createEntity(200, 300)
  let box2 = createEntity(200, 360)

  let body1 = new Box(50, 50)
  let body2 = new Box(50, 50)

  box1.attach("body2d", body1)
    .attach("sprite", new BodySprite())
  box2.attach("body2d", body2)
    .attach("sprite", new BodySprite())
  
  let an1 = body1.setAnchor(new Vector2(25,-25))
  let an2 = body2.setAnchor(new Vector2(-25,-25))
  
  let constraint1 = new DistanceConstraint(body1,body2,body1.getAnchor(an1),body2.getAnchor(an2))
  
  constraint1.stiffness = 1
  manager.add(box1)
  manager.add(box2)
  
  world.gravity = 1000
  world.add(constraint1)
}