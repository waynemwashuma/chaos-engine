import {
  Grid,
  Entity,
  Agent,
  Ball,
  BodySprite,
  AgentSprite,
  AgentManager,
  SeekBehaviour,
  EvadeBehaviour,
  PathFollowing,
  ArriveBehaviour,
  WanderBehaviour,
  Path,
  Vector
} from "/dist/chaos.module.js"

export function pathfollower(manager) {
  manager.registerSystem("agent", new AgentManager())
  let renderer = manager.getSystem("renderer")

  let a = Entity.Default(100, 100)
  let b = Entity.Default(100, 250)

  let aa = new Agent()
  let ab = new Agent()

  let p = new Path()
  p.tolerance = 60
  console.log(p);

  a.attach("body", new Ball(10))
  b.attach("body", new Ball(20))

  a.attach("mesh", new AgentSprite())
  b.attach("mesh", new BodySprite())

  a.attach("agent", aa)
  b.attach("agent", ab)
  
  //b.get("body").mass = 0
  aa.add(new PathFollowing(p))
  //ab.add(new PathFollowing(p1))
  //ab.add(new WanderBehaviour())

  manager.add(a)
  manager.add(b)

  p.add(new Vector(100,50))
  p.add(new Vector(300,100))
  p.add(new Vector(300,400))
  p.add(new Vector(200,600))
  p.add(new Vector(100,650))

  p.loop = true
}

