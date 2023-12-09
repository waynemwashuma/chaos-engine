import {
  ParticleSystemSprite,
  createEntity
} from "/src/index.js"

export function particle(manager) {
  manager.clear()
  
  let entity = createEntity(innerWidth/2,innerHeight/2 -200)
  let sprite = new ParticleSystemSprite(10,1000)
  entity.attach("sprite",sprite)
  
  manager.add(entity)
}