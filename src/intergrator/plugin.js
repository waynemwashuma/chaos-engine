import { verlet, euler } from "./intergrator.js"
import { Vector2 } from "../math/index.js"
import { Manager } from "../ecs/index.js"

class LinearDamping extends Number {}
class AngularDamping extends Number {}

export class Intergrator2DPlugin {
  /**
   * @param {IntergratorPluginOptions} options
   */
  constructor(options = {}) {
    options.intergrator = options.intergrator || "verlet"
    options.enableDamping = options.enableDamping || false
    options.linearDamping = options.linearDamping || 0.01
    options.angularDamping = options.angularDamping || 0.01

    this.options = options
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    if (this.options.enableDamping) {
      manager.setResource(new LinearDamping(this.options.linearDamping))
      manager.setResource(new AngularDamping(this.options.angularDamping))
      manager.registerSystem(dampenVelocity)
    }
    manager.registerSystem(updateTransformVerlet)
  }
}
/**
 * @param {Manager} manager
 */
export function dampenVelocity(manager) {
  const [movables] = manager.query(["movable"]).raw()
  const linear = 1 - manager.getResource("lineardamping")
  const angular = 1 - manager.getResource("angulardamping")
  for (let i = 0; i < movables.length; i++) {
    for (let j = 0; j < movables[i].length; j++) {
      const velocity = movables[i][j].velocity
      Vector2.multiplyScalar(velocity, linear, velocity)
      movables[i][j].rotation *= angular
    }
  }
}
/**
 * @param {Manager} manager
 */
export function updateTransformVerlet(manager) {
  const query = manager.query(["position2d", "velocity2d", "acceleration2d", "orientation2d", "rotation2d", "torque2d"])
  const dt = 1 / 60

  query.each(([position, velocity, acceleration, orientation, rotation, torque]) => {
    verlet(
      position,
      velocity,
      acceleration,
      orientation,
      rotation,
      torque,
      dt
    )
  })
}
/**
 * @param {Manager} manager
 */
export function updateTransformEuler(manager) {
  const query = manager.query(["position2d", "velocity2d", "acceleration2d", "orientation2d", "rotation2d", "torque2d"])
  const dt = 1 / 60

  query.each(([position, velocity, acceleration, orientation, rotation, torque]) => {
    euler(
      position,
      velocity,
      acceleration,
      orientation,
      rotation,
      torque,
      dt
    )
  })
}
/**
 * @typedef IntergratorPluginOptions
 * @property {boolean} [enableDamping]
 * @property {number} [linearDamping]
 * @property {number} [angularDamping]
 * @property {"euler" | "verlet"} [intergrator]
 */