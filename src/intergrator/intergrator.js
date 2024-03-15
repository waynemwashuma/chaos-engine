import { Transform } from "./transformComponent.js"
import { Vector2 } from "../math/index.js"
import { Movable } from "./movableComponent.js"
export class Intergrator {
  /**
   * @param {IntergratorFunc} intergrator
   * @param {Transform[][]} transforms
   * @param {Movable[][]} movables
   * @param {number} dt
   */
  static update(transforms, movables, dt, intergrator = Intergrator.verlet) {
    for (let i = 0; i < transforms.length; i++) {
      for (let j = 0; j < transforms[i].length; j++) {
        //damping
        //movables[i][j].velocity.multiply(1 - 0.01)
        //movables[i][j].rotation *= 1 - 0.01

        //intergation
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

    Vector2.set(
      velocity,
      velocity.x + acceleration.x * dt,
      velocity.y + acceleration.y * dt,
    )
    Vector2.set(
      position,
      position.x + velocity.x * dt,
      position.y + velocity.y * dt
    )
    Vector2.set(acceleration, 0, 0)

    movable.rotation += movable.torque * dt
    transform.orientation += movable.rotation * dt
    movable.torque = 0
  }
  /**
   * @param {Transform} transform
   * @param {Movable} movable
   * @param {number} dt
   */
  static verlet(transform, movable, dt) {
    const position = transform.position
    const velocity = movable.velocity
    const acceleration = movable.acceleration

    Vector2.multiplyScalar(acceleration, dt * 0.5, acceleration)
    Vector2.add(velocity, acceleration, velocity)
    Vector2.set(
      position,
      position.x + velocity.x * dt + acceleration.x * dt,
      position.y + velocity.y * dt + acceleration.y * dt
    )
    Vector2.add(velocity, acceleration, velocity)
    Vector2.set(acceleration, 0, 0)

    movable.rotation += movable.torque * dt * 0.5
    transform.orientation += movable.rotation * dt + movable.torque * dt
    movable.rotation += movable.torque * dt * 0.5
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