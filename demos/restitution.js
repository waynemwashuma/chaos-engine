import {
  createEntity,
  Box,
  BodySprite,
  Body2D
} from "/src/index.js"

export function restitution(manager) {
  let world = manager.getSystem("world")

  let box = createEntity(100, 100)
  let body = new Box(50, 50)
  let box2 = createEntity(200, 100)
  let body2 = new Box(50, 50)
  let box3 = createEntity(300, 100)
  let body3 = new Box(50, 50)
  let floor = createEntity(200, 400)
  let body4 = new Box(400, 20)

  body.restitution = 1
  body2.restitution = 0.6
  body3.restitution = 0.2
  body4.restitution = 1
  body4.type = Body2D.STATIC

  box.attach("body", body)
    .attach("sprite", new BodySprite())
  box2.attach("body", body2)
    .attach("sprite", new BodySprite())
  box3.attach("body", body3)
    .attach("sprite", new BodySprite())
  floor.attach("body", body4)
    .attach("sprite", new BodySprite())

  manager.add(box)
  manager.add(box2)
  manager.add(box3)
  manager.add(floor)

  world.gravity = 980
}