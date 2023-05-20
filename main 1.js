import { manager } from "/src/debug.js"
import { CanvasBounds, BoxEntity, BallEntity } from "/assets/index.js"
import { Vector, Manager, DebugMesh, rand,Renderer,ParticleSystemSprite } from "/src/index.js"


let events = manager.getSystem("events")
let renderer = manager.getSystem("renderer")
let world = manager.getSystem("world")

renderer.bindTo("#can")
renderer.setViewport(innerWidth, innerHeight)

let img = new Image()
img.src = "img.jpg"

let r = new ParticleSystemSprite(20,1)
console.log(r);
r.position.set(200, 200)

renderer.add(r)

setInterval(e => {
  //r.angle += 0.2
})
