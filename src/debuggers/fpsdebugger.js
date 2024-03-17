import { Manager } from "../ecs/index.js"
import { Perf } from "../utils/index.js"

/**
 * @param {Manager} manager
 */
export function fpsDebugger(manager) {
  const container = document.body.appendChild(document.createElement("div"))

  container.id = "fps-container"
  container.style.position = "absolute"
  container.style.top = "0px"
  container.style.right = "0px"
  container.style.width = "100px"
  container.style.height = "20px"
  container.style.background = "black"
  container.style.textAlign = "center"
  container.style.color = "white"

  const timer = {
    updateTime: 0.5,
    timerDt: 0,
    perf: new Perf()
  }
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