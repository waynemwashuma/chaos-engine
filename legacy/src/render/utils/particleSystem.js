import { Vector, Mesh } from "../../index.js"

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}
class Particle extends Mesh {
  constructor(pos, lifespan) {
    super(pos)
    this.velocity = new Vector()
    this.radius = rand(1, 10)
    this.color = {
      r: 255,
      g: 0,
      b: 0,
      a: 1
    }
    this.lifespan = lifespan
    this._life = new Accumulator(lifespan)
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
  update(ctx, dt) {
    this.position.add(this.velocity.clone().multiply(dt))
    this.active = !this._life.update(dt,false)
    super.update(...arguments)
  }
  init(){}
}
class System extends Mesh {
  constructor(position, max, blueprint) {
    super(position)
    this.particles = []
    this.initial = 20
    this.frameIncrease = 5
    this.max = max
    this.blueprint = blueprint || Particle
  }
  initParticles(n) {
    for (var i = 0; i < n; i++) {
      this.add(new this.blueprint(this.position, rand(1, 10)))
    }
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
  System
}