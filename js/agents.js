import {
  Grid,
  Entity,
  Agent,
  Ball,
  BodySprite,
  AgentManager,
  SeekBehaviour,
  EvadeBehaviour
} from "/dist/chaos.module.js"

export function agents(manager) {
  manager.registerSystem("agent", new AgentManager())
  //manager.clear()
  let renderer = manager.getSystem("renderer")
  
  let a = Entity.Default(170, 300)
  let b = Entity.Default(150, 270)

  let aa = new Agent()
  let ab = new Agent()

  a.attach("body", new Ball(10))
  b.attach("body", new Ball(20))

  a.attach("mesh", new BodySprite())
  b.attach("mesh", new BodySprite())

  a.attach("agent", aa)
  b.attach("agent", ab)

  a.get("movable").velocity.y = -100
    aa.add(new SeekBehaviour(b))
    ab.add(new EvadeBehaviour(a))
    
  renderer.camera.follow(b.get("transform").position)
  renderer.camera.offset = {
    x:-renderer.width/2,
    y:-renderer.height/2
  }
  manager.add(a)
  manager.add(b)
}