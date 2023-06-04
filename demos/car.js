
import { Vector, DebugMesh, SpringConstraint,Entity,Box,Ball, Composite,BodyMesh } from "/src/index.js"

export function car(manager) {
  let world = manager.getSystem("world")

  createCar(200,250,20,3,manager)

  world.gravity = { x: 0, y: 980 }

 /* setInterval(x => {
    tire1.get("body").angularVelocity -= 10
    tire2.get("body").angularVelocity += 10
  })*/
}

function createCar(x,y,tireSize= 20,maskgroup=1,manager) {
  let car = Entity.Default(200, 250)
  
  let tirebody1 = new Ball(tireSize)
  let tirebody2 = new Ball(tireSize)
  let carbody = new Box(100,50)
  let constraint1 = new SpringConstraint(carbody, tirebody1, { x: 30, y: 25 })
  let constraint2 = new SpringConstraint(carbody, tirebody2, { x: -30, y: 25 })
  
  let carE = new Composite()
  
  carE.add(tirebody1)
  //carE.add(tirebody2)
  carE.add(carbody)
  //carE.add(constraint1)
  //carE.add(constraint2)
  
  car.attach("body",carE).attach("mesh",new BodyMesh())
  console.log(car);
  
  tirebody1.position.set(160, 285)
  tirebody1.position.set(240, 275)
  carbody.mask.group = maskgroup
  tirebody1.mask.group = maskgroup
  tirebody2.mask.group = maskgroup
  
  manager.add(car)
}