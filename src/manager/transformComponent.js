import {Component} from "./component.js"
import { Vector,Angle } from "../math/index.js"

/**
 * Holds transformation info of an entity 
 * 
 * @implements Component
*/
class Transform {
  entity = null
  constructor(x,y,a){
    this.position = new Vector(x,y)
    this.orientation = new Angle(a)
  }
  init(){}
}
export {
  Transform
}