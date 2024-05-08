import { Vector2, Angle } from "../math/index.js"

/**
 * @type {IntergratorFunc}
 */
export function euler(position, velocity, acceleration, orientation, rotation, torque, dt) {
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

  rotation.value += torque.value * dt
  orientation.value += rotation.value * dt
  torque.value = 0
}
/**
 * @type {IntergratorFunc}
 */
export function verlet(position, velocity, acceleration, orientation, rotation, torque, dt) {
  
  Vector2.multiplyScalar(acceleration, dt * 0.5, acceleration)
  Vector2.add(velocity, acceleration, velocity)
  Vector2.set(
    position,
    position.x + velocity.x * dt + acceleration.x * dt,
    position.y + velocity.y * dt + acceleration.y * dt
  )
  Vector2.add(velocity, acceleration, velocity)
  Vector2.set(acceleration, 0, 0)
  torque.value *= dt * 0.5
  rotation.value += torque.value
  orientation.value += rotation.value * dt + torque.value * dt
  rotation.value += torque.value * dt * 0.5
  torque.value = 0

}

/**
 * @callback IntergratorFunc
 * @param {Vector2} position
 * @param {Vector2} velocity
 * @param {Vector2} acceleration
 * @param {Angle} orientation
 * @param {Angle} rotation
 * @param {Angle} torque
 * @param {number} dt
 * @returns {void}
 */