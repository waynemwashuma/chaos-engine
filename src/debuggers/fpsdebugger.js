//import {System} from "../ecs/index.js"

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
    init(manager){
      this.perf = manager.perf
    },
    update(dt){
      container.innerHTML = this.perf.fps()
    }
  })
}