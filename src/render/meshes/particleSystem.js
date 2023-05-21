import { Sprite } from "../../index.js"
import { Vector,rand } from "../../utils/index.js"

let tmp1 = new Vector()
class Particle {
  constructor(radius,lifespan = 5) {
    this.position = new Vector()
    this.active = true
    this.velocity = new Vector()
    this.radius = radius
    this.color = {
      r: 100,
      g: 255,
      b: 255,
      a: 1
    }
    this.lifespan = lifespan
    this._life = 0
  }
  draw(ctx) {
    ctx.begin()
    ctx.circle(...this.position, this.radius)
    ctx.fill(`rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`)
    ctx.close()
  }
  behavior(){
    this.velocity.set(
      this.velocity.x + rand(-1,1),
      this.velocity.y + rand(0,0.3)
      )
  }
  update(ctx, dt) {
    this._life += dt
    this.behavior()
    this.position.add(tmp1.copy(this.velocity).multiply(dt))
    this.active = this._life < this.lifespan
  }
  init(){}
}
class System extends Sprite {
  constructor(initial = 1, max = 100,increment = 5) {
    super()
    this.initial = initial
    this.frameIncrease = increment
    this.max = max
  }
  initParticles(n) {
    for (var i = 0; i < n; i++) {
      this.add(this.create())
    }
  }
  create(){
    return new Particle(rand(1,10),rand(1,6))
  }
  init() {
    console.log(...arguments);
    super.init(...arguments)
    this.initParticles(this.initial)
  }
  update(ctx, dt) {
    ctx.translate(...this.position)
    for (let i = this._children.length - 1; i > 0; i--) {
      let p = this._children[i]
      p.update(ctx, dt)
      p.draw(ctx,dt)
      if (!p.active) {
        this.remove(i)
      }
    }
    if (this._children.length < this.max) {
      this.initParticles(this.frameIncrease)
    }
    ctx.reset()
  }
  remove(index){
    this._children.splice(index,1)
  }
  add(particle){
    this._children.push(particle)
  }
}
export {
  Particle,
  System as ParticleSystemSprite
}