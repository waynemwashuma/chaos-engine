import { BoundingBox } from "../math/index.js"

/**
 * Component to hold the bounds of an entity.
 * 
 */
export class Bound {
  /**
   * The actual bounds.Used for collision detection.
   * 
   * @type {BoundingBox | BoundingCircle}
   */
  bounds = new BoundingBox()
  
  toJson(){
    return {
      bounds:this.bounds.toJson()
    }
  }
  fromJson(obj){
    this.bpunds.fromJson(obj.bounds)
  }
}