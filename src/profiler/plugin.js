import { Profiler } from "./resources/index.js"
import { Timer,TimerMode } from "../time/index.js"

class ProfilerTimer extends Timer{}

export class ProfilerPlugin {
  register(app) {
    app.setResource(new Profiler())
    app.setResource(new ProfilerTimer(1,TimerMode.REPEAT))
    setupProfileViewer(document.body)
    app.registerSystem(updateProfileViewer)
    app.registerSystem(updateProfileTimer)
  }
}
/**
 * @param {HtmlElement} parent
 */
function setupProfileViewer(parent) {
  const container = parent.appendChild(document.createElement("p"))
  container.id = "profile-view"
  container.style.position = "absolute"
  container.style.right = "0px"
  container.style.top = "0px"
  container.style.color = "white"
  container.style.background = "black"
}
function updateProfileTimer(registry){
  const timer = registry.getResource("profilertimer")
  const clock = registry.getResource("virtualclock")
  Timer.update(timer,clock.delta)
}
function updateProfileViewer(registry) {
  const profiler = registry.getResource("profiler")
  const timer = registry.getResource("profilertimer")
  
  if(!timer.finished)return
  
  const container = document.getElementById("profile-view")
  container.innerHTML = ""
  for (const [key, value] of profiler.profiles) {
    const p = container.appendChild(document.createElement('p'))
    p.append(document.createTextNode(
      key + ": " + value.delta.toFixed(4) + "ms"
    ))
  }
}