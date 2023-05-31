import { CanvasBounds, BallEntity, BoxEntity } from "/assets/index.js"
import { Vector, DebugMesh, SpringConstraint } from "/src/index.js"

export function car(manager) {
  let world = manager.getSystem("world")
  
  let tireSize = 20
  
  let tire1 = new BallEntity(160, 285, tireSize)
  let tire2 = new BallEntity(240, 275, tireSize)
  let load = new BoxEntity(200, 50, 100, 50)
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
  
  world.gravity = { x: 0, y: 980 }
  
  setInterval(x=>{
    ///tire1.get("body").angularVelocity -= 10
  })
}