import { Vector,Utils } from "../utils/index.js"

class BehaviourManager {
  constructor() {
    this._behaviours = []
    this._accumulated = new Vector()
    this.active = false
  }
  add(behaviour) {
    this._behaviours.push(behaviour)
    if(this.active)behaviour.init(this._agent)
  }
  remove(behaviour) {
    Utils.removeElement(this._behaviours,this._behaviours.indexOf(behaviour))
  }
  init(agent){
    this._agent = agent
    for (var i = 0; i < this._behaviours.length; i++) {
      this._behaviours[i].init(agent)
    }
  }
  update(inv_dt) {
    let result = new Vector()
    this._accumulated.set(0,0)
    for (let i = 0; i < this._behaviours.length; i++) {
      this._behaviours[i].calc(result,inv_dt)
      this._accumulated.add(result)
    }
    this._agent.acceleration.add(this._accumulated)
    this._agent.orientation.radian = Vector.toRad(this._agent.velocity)
  }
  clear(){
    Utils.clearArr(this._behaviours)
  }
}
export {
  BehaviourManager
}