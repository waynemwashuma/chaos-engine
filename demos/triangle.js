import {
    Entity,
    Trigon,
    BodySprite
  } from  "/src/index.js"
  export function triangle(manager) {
    let world = manager.getSystem("world")
    
    let box = Entity.Default(200,100)
    let body = new Trigon(50,50 * Math.sin(30),60)
    
    box.attach("body",body)
    .attach("sprite",new BodySprite())
    manager.add(box)
    world.gravity = 980
  }