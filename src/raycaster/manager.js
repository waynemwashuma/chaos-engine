import { System } from "../ecs/index.js"

export class RaycastManager extends System {
  objects = []
  bodies = null
  init(manager) {
    if (!manager.getSystem("world"))
      throw "World is required for running Raycast system."
    
    let renderer = manager.getSystem("renderer")
    manager.setComponentList("raycaster",this.objects)
    this.bodies = manager.getComponentList("body")
    renderer.add({
      context:this,
      render(ctx) {
        this.context.objects.forEach(e=>{
          e.draw(ctx)
        })
      }
    })
  }
  update(){
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this.bodies)
    }
  }
}