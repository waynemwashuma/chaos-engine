import { Movable } from "./movableComponent.js"
import { Transform } from "./transformComponent.js"

export class Intergrator {
  /**
   * @param {IntergratorFunc} intergrator
   * @param {Transform[][]} transforms
   * @param {Movable[][]} movables
   * @param {number} dt
   */
  static update(transforms, movables, dt,intergrator = Intergrator.euler) {
    for (let i = 0; i < transforms.length; i++) {
      for (let j = 0; j < transforms[i].length; j++) {
        intergrator(
          transforms[i][j],
          movables[i][j],
          dt
        )
      }
    }
  }
  /**
   * @type {IntergratorFunc}
  */
  static euler(transform, movable, dt) {
    const position = transform.position
    const velocity = movable.velocity
    const acceleration = movable.acceleration
  
    velocity.set(
      velocity.x + acceleration.x * dt,
      velocity.y + acceleration.y * dt,
    )
    position.set(
      position.x + velocity.x * dt,
      position.y + velocity.y * dt
    )
    movable.rotation += movable.torque * dt
    transform.orientation += movable.rotation * dt
    acceleration.set(0, 0)
    movable.torque = 0
  }
}

/**
 * @callback IntergratorFunc
 * @param {Transform} transform
 * @param {Movable} movable
 * @param {number} dt
 * @returns {void}
*/