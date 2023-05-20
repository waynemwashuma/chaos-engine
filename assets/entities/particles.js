import { ParticleSystem,Entity} from "/src/index.js"
class Particles extends Entity {
  constructor() {
    super(...arguments)
    this.mesh = new ParticleSystem(this.position, 100)
  }
  init() {
    super.init(...arguments)
    this.body.mask.layer = -1
  }
  update(dt) {
    super.update(...arguments)

  }
}
export{
  Particles
}