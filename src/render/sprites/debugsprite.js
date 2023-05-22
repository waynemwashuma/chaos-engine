import { Sprite } from "./sprite.js"
import { round } from "../../utils/index.js"
class DebugMesh extends Sprite {
  constructor(manager) {
    super()
    this.manager = manager
    this.count = 25
    this.now = 0
    this.lastPerf = {}
    this.drawBounds = false
  }
  update(ctx, dt) {
    this.now++
    let renderer = this.manager.getSystem("renderer")
    let world = this.manager.getSystem("world")
    let phy = world?.perf?.total,
      rend = renderer?.perf?.total,
      framerate = 1 / dt

    if (this.now > this.count) {
      this.lastPerf.rate = round(framerate, 2)
      this.lastPerf.actual = round(1 / (rend + phy) * 1000, 2)
      this.lastPerf.phy = round(phy, 2)
      this.lastPerf.ren = round(rend, 2)
      this.lastPerf.tot = round(this.manager.perf.total, 2)
      this.now = 0
    }
    ctx.begin()
    ctx.translate( renderer.width - 80, 80)
    ctx.fill("cyan")
    ctx.fillText(this.lastPerf.actual + "afps", 0, -20)
    ctx.fillText("render: " + this.lastPerf.ren + "ms", 0, 0)
    ctx.fillText("physics: " + this.lastPerf.phy + "ms", 0, 10)
    ctx.fillText("total: " + this.lastPerf.tot + "ms", 0, 20)
    ctx.fillText(`bodies: ${world?.objects?.length}`, 0, 30)

    if (this.lastPerf.rate > 59)
      ctx.fill("cyan")
    else if (this.lastPerf.rate > 29)
      ctx.fill("orange")
    else if (this.lastPerf.rate <= 29)
      ctx.fill("red")

    ctx.fillText(this.lastPerf.rate + "fps", 0, -30)
    ctx.close()
    ctx.translate( -renderer.width + 80, -80)
  }
}

export {
  DebugMesh
}