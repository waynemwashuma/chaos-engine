import { Behaviour } from "./behaviour.js"
import { Vector,clamp } from "../../utils/index.js"

import {ctx} from "/src/debug.js"

const tmp1 = new Vector()
const tmp2 = new Vector()
const tmp3 = new Vector()
export class PathFollowing extends Behaviour {
  constructor(path) {
    super()
    this.path = path
  }
  calc(target,inv_dt){
    tmp1.copy(this.position)
    let [p1,p2] = this.path.current()
    let dist = tmp2.copy(p2).sub(p1).magnitude()
    
    tmp2.normalize()
    
    let proj = tmp2.dot(tmp1.sub(p1))
    let dir = tmp3.copy(tmp2).multiply(proj)
    let projPoint = this.path.update(proj)
    
    tmp1.copy(projPoint).sub(this.position).multiply(10)
    target.add(tmp1)
    projPoint.draw(ctx)
    
    return target
  }
  clear(){
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
  setPath(path){
    
  }
}