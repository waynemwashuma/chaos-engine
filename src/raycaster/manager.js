import { System } from "../ecs/index.js"

export class RaycastManager extends System {
  objects = []
  bodies = null
  init(manager) {
    if (!manager.getSystem("world"))
      throw "World is required for running Raycast system."
    manager.setComponentList("raycaster",this.objects)
    this.bodies = manager.getComponentList("body")
    
  }
  update(){
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this.bodies)
    }
  }
}