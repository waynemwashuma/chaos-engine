import { Component } from "../ecs/index.js"
import { Vector2, Angle } from "../math/index.js"

/**
 * Holds transformation info of an entity 
 * 
 */
export class Transform extends Component{
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns 
   */
  constructor(x,y,a){
    super()
    this.position = new Vector2(x,y)
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