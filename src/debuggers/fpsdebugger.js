import { Manager } from "../ecs/index.js"
import { Perf } from "../utils/index.js"
import { deprecate } from "../logger/index.js"

export class FPSDebugger {
  register(manager) {
    const container = document.body.appendChild(document.createElement("div"))
    const timer = {
      updateTime: 0.5,
      timerDt: 0,
      perf: new Perf()
    }
    
    container.id = "fps-container"
    container.style.position = "absolute"
    container.style.top = "0px"
    container.style.right = "0px"
    container.style.width = "100px"
    container.style.height = "20px"
    container.style.background = "black"
    container.style.textAlign = "center"
    container.style.color = "white"
    
    manager.events.add("updateStart", dt => {
      timer.perf.start()
    })
    manager.events.add("updateEnd", dt => {
      timer.perf.end()
      timer.timerDt += dt
      if (timer.timerDt < timer.updateTime) return
      const fps = timer.perf.fps().toFixed(0)
      const afps = (1 / dt).toFixed(0)
      container.innerHTML =
        fps + " fps" +
        "<br>" +
        afps + " afps"
      timer.timerDt = 0
    })
  }
}
/**
 * @param {Manager} manager
 */
export function fpsDebugger(manager) {
  manager.registerPlugin(new FPSDebugger())
}