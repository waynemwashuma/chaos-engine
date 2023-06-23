import {Component} from "./component.js"
import { Vector,Angle } from "../math/index.js"

class Transform {
  constructor(x,y,a){
    this.position = new Vector(x,y)
    this.orientation = new Angle(a)
  }
  init(){}
}
export {
  Transform
}