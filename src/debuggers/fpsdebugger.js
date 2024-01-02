//import {System} from "../ecs/index.js"
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
  
  manager.registerSystem("fps",{
    updateTime : 0.5,
    timerDt : 0,
    init(manager){
      this.perf = manager.perf
    },
    update(dt){
      this.timerDt += dt
      if(this.timerDt < this.updateTime)return
      container.innerHTML = this.perf.fps().toFixed(2)
      this.timerDt = 0
    }
  })
}