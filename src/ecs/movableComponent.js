import { Component } from "./component.js"
import { Vector2, Angle } from "../math/index.js"
/**
 * Component to hold requirements for an entity to move.
 * 
 * @implements Component
 */
export class Movable extends Component {
  entity = null
  /**  * 
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns {Entity}
   */
  constructor(x, y, a) {
    super()
    this.velocity = new Vector2(x, y)
    this.rotation = new Angle(a)
    this.acceleration = new Vector2()
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