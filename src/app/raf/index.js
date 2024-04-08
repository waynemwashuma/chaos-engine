import { Clock } from "../../math/index.js"

export class VirtualClock extends Clock {}
export class Delta extends Number{}
class RAFUpdater {
  accumulate = 0
  frameRate = 1 / 60
  id = 0
}

export class RAFPlugin {
  register(manager) {
    manager.setResource("virtualclock", new VirtualClock())
    manager.setResource("rafupdater", new RAFUpdater())
    manager.registry.setResource("delta",new Delta(0))
    manager.registry.events.add("init", playRaf)

    function playRaf(accumulate) {
      manager.registry.events.trigger("updateStart")
      const clock = manager.registry.getResource("virtualclock")
      const raf = manager.registry.getResource("rafupdater")
      const delta = Clock.update(clock, accumulate);
      const id = requestAnimationFrame(playRaf)
      raf.accumulate += delta
      if (!fuzzyGreater(raf.accumulate, raf.frameRate,0.00001)) return
      manager.registry.update(0.016)
      manager.registry.events.trigger("updateEnd", raf.accumulate)
      manager.registry.setResource("delta",new Delta(delta))
      raf.accumulate = 0
      raf.id = id
    }
  }
}

function fuzzyGreater(a, b, t = 0.1) {
  return a + t > b
}