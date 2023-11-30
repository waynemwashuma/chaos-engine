import {
  createEntity,
  Agent,
  BodySprite,
  AgentSprite,
  WanderBehaviour,
  Vector2,
  Box,
  rand
} from "/src/index.js"

export function wanderer(manager) {
  manager.getSystem("world").gravity = 0

  for (var i = 0; i < 10; i++) {
    manager.add(createWonderer(
      rand(100, innerWidth-100),
      rand(100, innerHeight - 100)
    ))
  }
}

function createWonderer(x, y) {
  let a = createEntity(x, y)
  let aa = new Agent()

  a.attach("body", new Box(30, 20))
  a.attach("sprite", new AgentSprite())
  //a.attach("sprite", new BodySprite())
  a.attach("agent", aa)

  aa.add(new WanderBehaviour())
  return a
}