import { Sprite } from "../../index.js"
import { Vector,rand } from "../../utils/index.js"

let tmp1 = new Vector()
class Particle extends Sprite {
  constructor(pos, lifespan) {
    super(pos)
    this.active = true
    this.velocity = new Vector()
    this.radius = rand(1, 10)
    this.color = {
      r: 255,
      g: 0,
      b: 0,
      a: 1
    }
    this.lifespan = lifespan
    this._life = 0
  }
  draw(ctx) {
    ctx.fill(`rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`)
    ctx.circle(0, 0, this.radius, 0, Math.PI * 2)
  }
  update(ctx, dt) {
    this._life += dt
    this.position.add(tmp1.copy(this.velocity).multiply(dt))
    this.active = this._life < this.lifespan
    super.update(...arguments)
  }
  init(){}
}
class System extends Sprite {
  constructor(initial, max) {
    super()
    this.particles = []
    this.initial = initial
    this.frameIncrease = 5
    this.max = max
  }
  initParticles(n) {
    for (var i = 0; i < n; i++) {
      this.add(this.create())
    }
  }
  create(){
    return new Particle(this.position,rand(10))
  }
  init() {
    super.init(...arguments)
    this.initParticles(this.initial)
  }
  behavior(particle, dt) {
    particle.velocity.add({ x: rand(-1, 1), y: rand(-1, 1) })
  }
  update(ctx, dt) {
    for (var i = 0; i < this.particles.length; i++) {
      let p = this.particles[i]
      this.behavior(p, dt)
      p.update(ctx, dt)

      if (!p.active) {
        this.remove(i)
        i--
      }
    }
    if (this.particles.length < this.max) {
      this.initParticles(this.frameIncrease)
    }
  }
  add(particle) {
    particle.init(this)
    this.particles.push(particle)
  }
  remove(index) {
    this.particles.splice(index, 1)
  }
}
export {
  Particle,
  System as ParticleSystemSprite
}