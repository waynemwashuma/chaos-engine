import {
  Vector2,
  DistanceConstraint,
  createEntity,
  Box,
  Ball,
  Composite,
  BodySprite
} from  "chaos-studio"

export function car(manager) {
  let world = manager.getSystem("world")

  createCar(200, 250, 20, 3, manager)

  world.gravity = { x: 0, y: 980 }

  /* setInterval(x => {
     tire1.get("body2d").angularVelocity -= 10
     tire2.get("body2d").angularVelocity += 10
   })*/
}

function createCar(x, y, tireSize = 20, maskgroup = 1, manager) {
  let car = createEntity(x, y)

  let tirebody1 = new Ball(tireSize)
  let tirebody2 = new Ball(tireSize)
  let carbody = new Box(100, 50)
  let an1 = carbody.setAnchor(new Vector2(30,25))
  let an2 = carbody.setAnchor(new Vector2(-30,25))
  let constraint1 = new DistanceConstraint(carbody, tirebody1,carbody.getAnchor(an1))
  let constraint2 = new DistanceConstraint(carbody, tirebody2,carbody.getAnchor(an2))
  let carCompositeBody = new Composite()

  carCompositeBody.add(tirebody1)
  carCompositeBody.add(tirebody2)
  carCompositeBody.add(carbody)
  carCompositeBody.add(constraint1)
  carCompositeBody.add(constraint2)

  car.attach("body2d", carCompositeBody)
    .attach("sprite", new BodySprite())

  carbody.position.set(x, y)
  tirebody1.position.set(x + 30, y + 25)
  tirebody2.position.set(x - 30, y + 25)
  carbody.mask.group = maskgroup
  tirebody1.mask.group = maskgroup
  tirebody2.mask.group = maskgroup

  manager.add(car)
}