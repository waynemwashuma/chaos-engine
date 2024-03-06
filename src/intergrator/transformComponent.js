import { Vector2, Angle } from "../math/index.js"

/**
 * Holds transformation info of an entity 
 * 
 */
export class Transform{
  /**
   * @param {number} [x]
   * @param {number} [y]
   * @param {number} [a]
   */
  constructor(x = 0,y = 0,a = 0){
    this.position = new Vector2(x,y)
    this.orientation = a
    this.scale = new Vector2(1,1)
  }
  toJson(){
    return {
      position: this.position.toJson(),
      orientation:this.orientation
    }
  }
  fromJson(obj){
    this.position.fromJson(obj.position)
    this.orientation.fromJson(obj.orientation)
  }
}