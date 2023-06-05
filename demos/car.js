import {
  Vector,
  SpringConstraint,
  Entity,
  Box,
  Ball,
  Composite,
  BodyMesh
} from "/src/index.js"

export function car(manager) {
  let world = manager.getSystem("world")

  createCar(200, 250, 20, 3, manager)

  world.gravity = { x: 0, y: 980 }

  /* setInterval(x => {
     tire1.get("body").angularVelocity -= 10
     tire2.get("body").angularVelocity += 10
   })*/
}

function createCar(x, y, tireSize = 20, maskgroup = 1, manager) {
  let car = Entity.Default(x, y)

  let tirebody1 = new Ball(tireSize)
  let tirebody2 = new Ball(tireSize)
  let carbody = new Box(100, 50)
  let constraint1 = new SpringConstraint(carbody, tirebody1, { x: 30, y: 25 })
  let constraint2 = new SpringConstraint(carbody, tirebody2, { x: -30, y: 25 })

  let carCompisiteBody = new Composite()

  carCompisiteBody.add(tirebody1)
  carCompisiteBody.add(tirebody2)
  carCompisiteBody.add(carbody)
  carCompisiteBody.add(constraint1)
  carCompisiteBody.add(constraint2)

  car.attach("body", carCompisiteBody)
    .attach("mesh", new BodyMesh())

  carbody.position.set(x, y)
  tirebody1.position.set(x + 30, y + 25)
  tirebody2.position.set(x - 30, y + 25)
  carbody.mask.group = maskgroup
  tirebody1.mask.group = maskgroup
  tirebody2.mask.group = maskgroup

  manager.add(car)
}