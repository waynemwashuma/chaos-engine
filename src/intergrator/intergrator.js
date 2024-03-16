import { Movable } from "./movableComponent.js"
import { Transform } from "./transformComponent.js"
import { Vector2 } from "../math/index.js"

/**
 * @type {IntergratorFunc}
 */
export function euler(transform, movable, dt) {
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
export function verlet(transform, movable, dt) {
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

/**
 * @callback IntergratorFunc
 * @param {Transform} transform
 * @param {Movable} movable
 * @param {number} dt
 * @returns {void}
 */