import {Component} from "./component.js"
import { Vector } from "../utils/index.js"
import { Angle } from "../utils/index.js"

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