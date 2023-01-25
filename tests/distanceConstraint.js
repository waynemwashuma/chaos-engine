import { Renderer } from '/render/renderer.js'
import { Vector } from "/Objects/Vector.js"
import { Rectangle, Line, Circle, World, createBoundingBox, Body, DistanceConstraint } from "/physics/index.js"
const world = new World()
world.gravity = new Vector(0, 400)
//world.friction = 0.8
const render = new Renderer()
render.bindToHTML(document.querySelector("#can"))
world.add(...createBoundingBox(0, 0, render.width, 300 || render.height))
class Car {
  constructor(pos, tire1, tire2) {
    let tireSize = 15
    let body1 = new Body(tire1, new Circle(new Vector(0, 0),tireSize))
    let body2 = new Body(tire2, new Circle(new Vector(0, 0), tireSize))
    let body = new Body(pos, new Rectangle(new Vector(0, 0), 100, 50))
    
    let constraint1 = new DistanceConstraint(body, body1, tire1.clone().sub(pos))
    let constraint2 = new DistanceConstraint(body, body2, tire2.clone().sub(pos))
    body.layer = 2
    body.mass = 10
    body.angle = 0
    body1.restitution = 0.6
    body2.restitution = 0.6
    world.add(body)
    world.add(body1)
    world.add(body2)
    
    world.addConstraint(constraint2)
    world.addConstraint(constraint1)
    this.bodies = [body, body1, body2]
    this.constraints = [constraint1, constraint2]
  }
}
let car1 = new Car(new Vector(100, 200), new Vector(70, 230), new Vector(130, 230))
car1.bodies[0].acceleration = new Vector(200,0)
//let car2 = new Car(new Vector(300, 100), new Vector(270, 130), new Vector(330, 130))
//car1.bodies[0].velocity = new Vector(500)

render.add({
  update: (ctx, dt) => {
    world.update(dt)
    world.objects.forEach(ob => {
      ob.draw(ctx)
      //ob.drawVelocity(ctx)
    })
  }
})
window.r = render
window.w = world