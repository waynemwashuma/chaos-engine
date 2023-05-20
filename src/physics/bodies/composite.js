import { Component } from "/src/manager/component.js"
import {ObjType} from "../settings.js"
class Composite extends Component{
  constructor(bodies,constraints,composites){
    this.bodies = bodies
    this.constraints = constraints
    this.composites = composites
  }
  get physicsType(){
    return ObjType.COMPOSITE
  }
  init(parent){
    
  }
}

export{
  Composite
}