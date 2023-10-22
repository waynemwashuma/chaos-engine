import {
  Entity,
  Agent,
  Ball,
  BodySprite,
  AgentSprite,
  PathFollowing,
  WanderBehaviour,
  Path,
  Vector
} from "/src/index.js"

export function pathfollower(manager) {
  manager.getSystem("world").gravity = 0

  let a = Entity.Default(100, 100)
  let b = Entity.Default(100, 250)

  let aa = new Agent()
  let ab = new Agent()

  let p = new Path()
  p.tolerance = 60

  a.attach("body", new Ball(10))
  b.attach("body", new Ball(20))

  a.attach("sprite", new AgentSprite())
  b.attach("sprite", new BodySprite())

  a.attach("agent", aa)
  b.attach("agent", ab)
  
  aa.add(new PathFollowing(p))
  ab.add(new WanderBehaviour())

  manager.add(a)
  manager.add(b)

  p.add(new Vector(100,50))
  p.add(new Vector(300,100))
  p.add(new Vector(300,400))
  p.add(new Vector(200,400))
  p.add(new Vector(100,350))

  p.loop = true
}