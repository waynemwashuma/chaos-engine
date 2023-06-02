import { CanvasBounds, BallEntity, BoxEntity } from "/assets/index.js"
import { Vector, DebugMesh, SpringConstraint } from "/src/index.js"

export function car(manager) {
  let world = manager.getSystem("world")

  createCar(200,250,20,manager)

  world.gravity = { x: 0, y: 980 }

 /* setInterval(x => {
    tire1.get("body").angularVelocity -= 10
    tire2.get("body").angularVelocity += 10
  })*/
}

function createCar(x,y,tireSize= 20,manager) {
  let tire1 = new BallEntity(160, 285, tireSize)
  let tire2 = new BallEntity(240, 275, tireSize)
  let car = new BoxEntity(200, 250, 100, 50)
  
  let constraint1 = new SpringConstraint(car.get("body"), tire1.get("body"), { x: 30, y: 25 })
  let constraint2 = new SpringConstraint(car.get("body"), tire2.get('body'), { x: -30, y: 25 })
  
  car.get("body").mask.group = 3
  tire1.get("body").mask.group = 3
  tire2.get("body").mask.group = 3
  
  manager.add(car)
  manager.add(tire1)
  manager.add(tire2)
  world.addConstraint(constraint1)
  world.addConstraint(constraint2)
}