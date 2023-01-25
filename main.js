import { Renderer, renderer } from './render/renderer.js'
import { Vector } from "/utils/Vector.js"
import { Rectangle, Circle, World, Body, DistanceConstraint, HeightMap } from "./physics/main.js"
const world = new World()
const render = new Renderer()
render.bindToHTML(document.querySelector("#can"))
world.gravity = new Vector(0, 400)
class Car {
  constructor(pos, tire1, tire2) {
    let tireSize = 15
    let body1 = new Body(tire1, new Circle(new Vector(0, 0),tireSize))
    let body2 = new Body(tire2, new Circle(new Vector(0, 0), tireSize))
    let body = new Body(pos, new Rectangle(new Vector(0, 0), 100, 50))
    
    let constraint1 = new DistanceConstraint(body, body1, tire1.clone().sub(pos))
    let constraint2 = new DistanceConstraint(body, body2, tire2.clone().sub(pos))
    //constraint1.stiffness = 100
    //constraint2.stiffness = 100
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
let car1 = new Car(new Vector(0, 150), new Vector(-30, 180), new Vector(30, 180))
car1.bodies[0]. acceleration = new Vector(500)
function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}
function genMap(min, max,stepSize) {
  let heights = []
  for (let i = -50; i < render.width / stepSize; i++) {
    heights.push(rand(min, max))
  }
  let map = new HeightMap(stepSize,heights)
  map.layer = 0
  world.add(map)
  return map
}

let map = genMap(250,230,30)
render.add({
  update: (ctx, dt) => {
    world.update(dt)
    world.objects.forEach(ob => {
      ob.draw(ctx)
    })
  }
})
window.r = render
window.w = world