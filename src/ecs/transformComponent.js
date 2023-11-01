//import { Component } from "./component.js"
import { Vec2, Angle } from "../math/index.js"

/**
 * Holds transformation info of an entity 
 * 
 * @implements Component
 */
class Transform {
  entity = null
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns 
   */
  constructor(x,y,a){
    this.position = new Vec2(x,y)
    this.orientation = new Angle(a)
  }
  init(){}
  toJson(){
    return {
      position: this.position.toJson(),
      orientation:this.orientation.toJson()
    }
  }
  fromJson(obj){
    this.position.fromJson(obj.position)
    this.orientation.fromJson(obj.orientation)
  }
}
export {
  Transform
}