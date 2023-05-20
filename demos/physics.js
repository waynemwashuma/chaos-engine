
import {CanvasBounds,BallEntity,BoxEntity} from "/assets/index.js"
import {Manager,Vector,rand,DebugMesh} from "/src/index.js"

let manager = new Manager()
let bounds =new CanvasBounds()// new BoxEntity(new Vector(200,400),800,50)
manager.bindTo("#can")
manager.add(bounds)
manager.renderer.add(new DebugMesh(manager))
function randomEntities(n,manager){
  for (let i = 0; i < n; i++) {
    let pos = new Vector(rand(100, 300), rand(100, 300))
    let props = rand()
    let entity
    if (props <= .50)
      entity = new BoxEntity(pos,rand(10,50),rand(5,40))
    if (props > .50)
      entity = new BoxEntity(pos, rand(5, 20),rand(10,50))
    //entity.velocity = new Vector(rand(-300, 300), rand(-300, 300))
    manager.add(entity)
  }
}
randomEntities(200,manager)
window.m = manager
setTimeout(e=>{
  manager.world.gravity = new Vector(0,200)
},1000)