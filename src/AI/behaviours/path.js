import { Behaviour } from "./behaviour.js"
import { Vector } from "../../utils/index.js"

const tmp1 = new Vector()
const tmp2 = new Vector()
const tmp3 = new Vector()
class PathFollowing {
  constructor(path) {
    super()
    this.path = path
  }
  calc(target,inv_dt){
    let arrive = this.path.update(1/inv_dt)
    tmp1.copy(this.position).add(this.velocity)
    let dir = this.path.dir()
    let proj = tmp2.dot(tmp3)
    
  }
  reset(){
    this.path.clear()
  }
  init(agent){
    this.position = agent.position
    this.velocity = agent.velocity
  }
  add(point){
    this.path.add(point)
  }
  set loop(x){
    this.path.loop = x
  }
  get loop(){
    return this.path.loop
  }
}

export {
  Pursuit
}