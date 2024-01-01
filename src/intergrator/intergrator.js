import { System } from "../ecs/index.js"
import { Vector2 } from "../math/index.js"
import { Utils } from "../utils/index.js"

export class Intergrator extends System {
  /**
   * @type {boolean}
   */
  active = false
  /**
   * @type {typeof EulerSolver.solve}
   */
  solver = EulerSolver.solve
  /**
   * @type {Movable}
   */
  objects = []
  constructor() {
    super()
  }
  /**
   * @inheritdoc
   */
  init(manager) {
    const world = manager.getSystem("world")
    if (world) world.enableIntergrate = false
    this.active = true

    manager.setComponentList("movable", this.objects)
  }
  /**
   * @inheritdoc
   */
  update(dt) {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i] == void 0) return
      this.solver(
        this.objects[i].transform,
        this.objects[i],
        dt
      )
    }
  }
}
const a = new Vector2()
/**
 * Semi implicit euler integration.
 * More stable than explicit euler intergration.
 */
export class EulerSolver {
  /**
   * @param {Transform} transform
   * @param {Movable} movable
   * @param {number} dt
   */
  static solve(transform, movable, dt) {
    const position = transform.position
    const velocity = movable.velocity
    const acceleration = movable.acceleration
    const orientation = transform.orientation
    const rotation = movable.rotation
    const torque = movable.torque

    velocity.add(acceleration.multiply(dt))
    a.copy(velocity)
    position.add(a.multiply(dt))
    rotation.value += torque.value * dt
    orientation.value += rotation.value * dt
    acceleration.set(0, 0)
    torque.value = 0
  }
}