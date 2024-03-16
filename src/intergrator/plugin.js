import { verlet, euler } from "./intergrator.js"
import { Vector2 } from "../math/index.js"
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
  register(manager) {
    if (this.options.enableDamping) {
      manager.setResource("linearDamping", this.options.linearDamping)
      manager.setResource("angularDamping", this.options.angularDamping)
      manager.registerSystem(dampenVelocity)
    }
    manager.registerSystem(updateTransformVerlet)
  }
}

export function dampenVelocity(manager) {
  const [movables] = manager.query("movable").raw()
  const linear = 1 - manager.getResource("linearDamping")
  const angular = 1 - manager.getResource("angularDamping")
  for (let i = 0; i < transforms.length; i++) {
    for (let j = 0; j < transforms[i].length; j++) {
      const velocity = movables[i][j].velocity
      Vector2.multiplyScalar(velocity, linear, velocity)
      movables[i][j].rotation *= angular
    }
  }
}
export function updateTransformVerlet(manager) {
  const [transforms, movables] = manager.query("transform", "movable").raw()
  const dt = 1/60// manager.getResource("delta")
  
  for (let i = 0; i < transforms.length; i++) {
    for (let j = 0; j < transforms[i].length; j++) {
      verlet(
        transforms[i][j],
        movables[i][j],
        dt
      )
    }
  }
}
export function updateTransformEuler(manager) {
  const [transforms, movables] = manager.query("transform", "movable").raw()
  const dt = manager.getResource("delta")

  for (let i = 0; i < transforms.length; i++) {
    for (let j = 0; j < transforms[i].length; j++) {
      euler(
        transforms[i][j],
        movables[i][j],
        dt
      )
    }
  }
}

/**
 * @typedef IntergratorPluginOptions
 * @property {boolean} [enableDamping]
 * @property {number} [linearDamping]
 * @property {number} [angularDamping]
 * @property {"euler" | "verlet"} [intergrator]
 */