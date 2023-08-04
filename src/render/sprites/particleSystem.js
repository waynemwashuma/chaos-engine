import { Sprite } from "./sprite.js"
import { Vector, rand } from "../../math/index.js"
import { circle, fill } from "../utils/index.js"

/**
 * Its a fricking particle!
 */
class Particle {
  /**
   * @readonly
   * @type Vector
   */
  position = null
  /**
   * @readonly
   * @type Vector
   */
  velocity = null
  /**
   * @type boolean
   */
  active = true
  /**
   * @type number
   */
  radius = 0
  /**
   * @type {{r:number,b:number,g:number,a:number}}
   */
  color = null
  /**
   * @private
   * @type number
   */
  _life = 0
  /**
   * @readonly
   * @type number
   */
  lifespan = 0
  /**
   * @param {Vector} pos
   * @param {number} radius
   * @param {number} [lifespan=5] In seconds
   */
  constructor(pos, radius, lifespan = 5) {
    this.position = pos
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
  /**
   * Renders a particle.
   */
  draw(ctx) {
    ctx.beginPath()
    circle(ctx, ...this.position, this.radius)
    fill(ctx, `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`)
    ctx.closePath()
  }
  /**
   * Updates a particle's lifetime
   */
  update(ctx, dt) {
    this._life += dt
    this.position.add(this.velocity)
    this.active = this._life < this.lifespan
  }
}

/**
 * This creates a particle system 
 * @augments Sprite
 */
class System extends Sprite {
  /**
   * @private
   */
  _particles = []
  /**
   * @type number
   * @default 1
   */
  initial = 0
  /**
   * @type number
   * @default 1
   */
  frameIncrease = 0
  /**
   * @type number
   * @default 1
   */
  max = 0
  /**
   * @param {number} [initial=1] Number of particles to start with.
   * @param {number} [max=100] Maximum number of particles.
   * param {number} [increment=5] Maximum number of particles.
   */
  constructor(initial = 1, max = 100, increment = 5) {
    super()
    this.initial = initial
    this.frameIncrease = increment
    this.max = max
  }

  /**
   * @protected
   * @param {number} n
   */
  initParticles(n) {
    for (var i = 0; i < n; i++) {
      this._particles.push(this.create())
    }
  }

  /**
   * override this to return an object created from your own class extending the particle class
   * 
   * @protected
   */
  create() {
    return new Particle(
      new Vector(...this.position),
      rand(1, 10),
      rand(1, 6)
    )
  }
  /**
   * @inheritdoc
   */
  init(entity) {
    super.init(entity)
    this.initParticles(this.initial)
  }
  /**
   * @protected
   * @param {Particle} p
   */
  behavior(p,dt) {
    p.velocity.set(
      p.velocity.x + rand(-1, 1)*dt,
      p.velocity.y + rand(0, 0.3)*dt
    )
  }
  /**
   * @inheritdoc
   */
  render(ctx, dt) {
    for (let i = this._particles.length - 1; i > 0; i--) {
      let p = this._particles[i]
      p.update(ctx, dt)
      this.behavior(p,dt)
      p.draw(ctx, dt)
      if (!p.active) {
        this._particles.splice(i, 1)
      }
    }
    if (this._particles.length < this.max) {
      this.initParticles(this.frameIncrease)
    }
  }
}
export {
  Particle,
  System as ParticleSystemSprite
}