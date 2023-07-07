import { Component } from "./component.js"
import { Vector, Angle } from "../math/index.js"
/**
 * Component to hold requirements for an entity to move.
 * 
 * @implements Component
*/
class Movable extends Component {
  constructor(x, y, a) {
    super()
    this.velocity = new Vector(x,y)
    this.rotation = new Angle(a)
    this.acceleration = new Vector()
    entity = null
  }
}
export {
  Movable
}