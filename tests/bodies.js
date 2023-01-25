import { Renderer } from '/render/renderer.js'
import { Vector } from "/utils/Vector.js"
import { Rectangle, Line, Circle, World, createBoundingBox, Body } from "/physics/index.js"
const world = new World()
const render = new Renderer()

render.bindToHTML(document.querySelector("#can"))
world.add(...createBoundingBox(0, 0, render.width, render.height))

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}
for (let i = 0; i < 100; i++) {
  let pos = new Vector(rand(30, 300), rand(30, 300))
  let randomMass = rand(0, 50)
  let props = rand()
  let offset = new Vector()
  let comp
  if (props <= .33)
    comp = new Line(offset, rand(10, 40), randomMass)
  if (props > .33 && props < .66)
    comp = new Circle(offset, rand(5, 20), randomMass)
  if (props >= .66)
    comp = new Rectangle(offset, rand(10, 30), rand(5, 20), randomMass)
  const body = new Body(pos, comp)
  body.velocity = new Vector(rand(30, 300), rand(30, 300))
  world.add(body)
}
render.add({
  update: (ctx, dt) => {
    world.update(dt)
    world.objects.forEach(ob => {
      ob.draw(ctx)
    })
  }
})

window.r = render;
window.w = world