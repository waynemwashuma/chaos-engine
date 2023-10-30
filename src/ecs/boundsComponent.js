import { BoundingBox } from "../physics/index.js"
import { Component } from "./component.js"


/**
 * Component to hold the bounds of an entity.
 * 
 * @implements Component
 */
class Bound extends Component {
  /**
   * The actual bounds.Used for collision detection.
   * 
   * @type BoundingBox | BoundingCircle
   */
  bounds = new BoundingBox()
  entity = null
  toJson(){
    return {
      bounds:this.bounds.toJson()
    }
  }
  fromJson(obj){
    this.bpunds.fromJson(obj.bounds)
  }
}

export {
  Bound
}