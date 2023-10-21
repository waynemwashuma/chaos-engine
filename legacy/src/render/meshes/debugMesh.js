import { Mesh } from "./sprite.js"
import { round } from "../../utils/index.js"
class DebugMesh extends Mesh {
  constructor(manager) {
    super({})
    this.manager = manager
    this.count = 30
    this.now = 0
    this.lastPerf = {}
  }
  update(ctx,dt) {
    this.now++
    const { framerate, physics, renderer, actualrate, total } = this.manager.perfomance
    if (this.now > this.count) {
      this.rate = framerate
      this.lastPerf.rate = framerate
      this.lastPerf.actual = actualrate
      this.lastPerf.phy = physics
      this.lastPerf.ren = renderer
      this.lastPerf.tot = total
      this.now = 0
    }
    ctx.fillStyle = "cyan"
    ctx.fillText(round(this.lastPerf.actual, 2) + "afps", this.manager.width - 80, 60)
    ctx.fillText("render:" + round(this.lastPerf.ren, 2) + "ms", this.manager.width - 80, 80)
    ctx.fillText("physics:" + round(this.lastPerf.phy, 2) + "ms", this.manager.width - 80, 90)
    ctx.fillText("total:" + round(this.lastPerf.tot, 2) + "ms", this.manager.width - 80, 100)
    if (this.lastPerf.rate > 59)
      ctx.fillStyle = "cyan"
    else if (this.lastPerf.rate > 29)
      ctx.fillStyle = "orange"
    else if (this.lastPerf.rate <= 29)
      ctx.fillStyle = "red"
    ctx.fillText(round(this.lastPerf.rate, 2) + "fps", this.manager.width - 80, 50)
  }
}

export {
  DebugMesh
}