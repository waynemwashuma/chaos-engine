import {
  ParticleSystemSprite,
  Entity
} from "/src/index.js"

export function particle(manager) {
  manager.clear()
  let renderer = manager.getSystem("renderer")
  
  let entity = Entity.Default(innerWidth/2,innerHeight/2 -200)
  let sprite = new ParticleSystemSprite(10,1000)
  entity.attach("sprite",sprite)
  
  manager.add(entity)
}