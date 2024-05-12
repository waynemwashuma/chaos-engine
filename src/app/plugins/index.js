import { Clock } from "../../time/index.js"

export class VirtualClock extends Clock {}

export class TimePlugin {
  register(manager) {
    manager.setResource(new VirtualClock())
    manager.registerUpdateSystem(updateClock)
  }
}
function updateClock(manager) {
  const clock = manager.getResource("virtualclock")
  
  Clock.update(clock)
}