import { Component } from "./component.js"
import { Vector, Angle } from "../math/index.js"
/**
 * Component to hold requirements for an entity to move.
 * 
 * @implements Component
 */
class Movable extends Component {
  entity = null
  /**  * 
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns {Entity}
   */
  constructor(x, y, a) {
    super()
    this.velocity = new Vector(x, y)
    this.rotation = new Angle(a)
    this.acceleration = new Vector()
  }
  toJson() {
    return {
      velocity: this.velocity.toJson(),
      rotation: this.rotation.toJson(),
      acceleration: this.acceleration.toJson()
    }
  }
  fromJson(obj) {
    this.velocity.fromJson(obj.velocity)
    this.rotation.fromJson(obj.rptatjon)
    this.acceleration.fromJson(obj.acceleration)
  }
}
export {
  Movable
}