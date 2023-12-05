import { Component } from "../ecs/index.js"
import { Vector2, Angle } from "../math/index.js"
/**
 * Component to hold requirements for an entity to move.
 * 
 */
export class Movable extends Component {
  /**  * 
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns {Entity}
   */
  constructor(x, y, a) {
    super()
    this.transform = null
    this.velocity = new Vector2(x, y)
    this.rotation = new Angle(a)
    this.acceleration = new Vector2()
    this.torque = new Angle()
  }
  init(entity){
    this.requires(entity,"transform")
    this.transform = entity.get("transform")
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