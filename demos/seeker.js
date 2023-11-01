import {
  Entity,
  Agent,
  AgentSprite,
  SeekBehaviour,
  EvadeBehaviour,
  Vec2,
  Box,
  rand
} from "/src/index.js"

export function seeker(manager) {
  manager.getSystem("world").gravity = 0


  let target = Entity.Default(innerWidth / 2, innerHeight / 2)
  let seeker = createSeeker(
    rand(100, innerWidth - 100),
    rand(100, innerHeight - 100),
    target.get("transform").position
  )
  let agent = new Agent()

  target.attach("body", new Box(30, 20))
  target.attach("agent",agent)
  target.attach("sprite", new AgentSprite())
  agent.add(new EvadeBehaviour(
    seeker.get("transform").position
    ))

  manager.add(target)
  manager.add(seeker)
}

function createSeeker(x, y, target) {
  let a = Entity.Default(x, y)
  let aa = new Agent()
  a.attach("body", new Box(30, 20))
  a.attach("sprite", new AgentSprite())
  a.attach("agent", aa)

  aa.add(new SeekBehaviour(target))
  return a
}