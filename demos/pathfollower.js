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

  let aa = new Agent()

  let p = new Path()
  p.tolerance = 10

  a.attach("body", new Ball(10))

  a.attach("sprite", new AgentSprite())

  a.attach("agent", aa)
  
  aa.add(new PathFollowing(p))

  manager.add(a)

  p.add(new Vector(100,50))
  p.add(new Vector(300,100))
  p.add(new Vector(300,400))
  p.add(new Vector(200,400))
  p.add(new Vector(100,350))

  p.loop = true
}