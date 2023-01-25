import { World } from "./physics/index.js"
import { Renderer } from "./render/renderer.js"
class Game {
  world = new World()
  renderer = new Renderer()
  objects = []
  constructor() {
    this.init()
  }
  add(...objects) {
    objects.forEach(obj => {
      render.add(object.mesh)
      world.add(object.body)
      this.objects.push(obj)
      this.obj.init(this)
    })
  }
  remove(...objects) {
    objects.forEach(obj => {
      render.remove(object.mesh)
      world.remove(object.body)
      this.objects.splice(this.objects.indexOf(obj, 1))
    })
  }
  RAF() {
    this._rafID = requestAnimationFrame(accumulate => {
      let dt = this.clock.update(accumulate)
      if (this._accumulator < this.frameRate) {
        this._accumulator += dt
        this.RAF()
        return
      }
      this.update(this._accumulator)
      this._accumulator = 0
      this.RAF()
    })
  }
  play() {
    this.RAF()
  }
  pause() {
    cancelAnimationFrame(this._rafID)
  }
  update(dt) {
    this.world.update(dt)
    this.renderer.update()
  }
}

export{
  Game
}