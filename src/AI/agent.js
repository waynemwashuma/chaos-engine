import {Component} from "../manager/index.js"
import {BehaviourManager} from "./behaviourManager.js"

class Agent extends Component {
  velocity = null
  rotation = null
  maxSpeed = 20
  maxTurnRate = 5
  constructor() {
    super()
    this.behaviours = new BehaviourManager()
  }
  init(parent){
    this.parent = parent
    this.requires("transform","movable")
    let move = this.get("movable"),
    transform = this.get("transform")
    this.velocity = move.velocity
    this.rotation = move.rotation
    this.position = transform.position
    this.orientation = transform.orientation
    this.acceleration = move.acceleration
    this.behaviours.init(this)
  }
  add(behaviour){
    this.behaviours.add(behaviour)
  }
  remove(behaviour) {
    this.behaviours.re(behaviour)
  }
  update(inv_dt){
    this.behaviours.update(inv_dt)
  }
}

export {
  Agent
}