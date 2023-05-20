class AgentManager {
  constructor() {
    this.objects = []
  }
  init(manager){
    manager.setComponentList("agent",this.objects)
  }
  update(dt){
    let inv_dt = 1/dt
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(inv_dt)
    }
  }
}

export{
  AgentManager
}