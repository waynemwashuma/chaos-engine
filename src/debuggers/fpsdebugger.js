import { Manager } from "../ecs/index.js"
import { deprecate } from "../logger/index.js"
import { Timer,TimerMode } from "../time/index.js"

class RAFTimer extends Timer {}
export class FPSDebugger {
  register(manager) {
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

    manager.setResource(new RAFTimer(1,TimerMode.REPEAT))
    manager.registerUpdateSystem(updateFPSCounter)
    manager.registerUpdateSystem(updateRAFTimer)
  }
}

function updateFPSCounter(manager) {
  const clock = manager.getResource("virtualclock")
  const timer = manager.getResource("raftimer")
  if (!timer.finished) return
  const container = document.querySelector("#fps-container")
  const fps = Math.round(clock.fps)
  container.innerHTML = fps + " fps"
}

function updateRAFTimer(manager) {
  const clock = manager.getResource("virtualclock")
  const timer = manager.getResource("raftimer")
  Timer.update(timer, clock.delta)
}
/**
 * @param {Manager} manager
 */
export function fpsDebugger(manager) {
  deprecate("fpsDebugger()", "FPSDebugger()")
  manager.registerPlugin(new FPSDebugger())
}