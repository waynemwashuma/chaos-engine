import { System } from "../ecs/index.js"
import { Vector2 } from "../math/index.js"
import {Utils} from "../utils/index.js"

export class Intergrator extends System {
  active = false
  solver = EulerSolver.solve
  transforms = []
  movables = []
  bounds = []
  constructor() {
    super()
  }
  init(manager) {
    let world = manager.getSystem("world")
    if (world) return
    this.active = true

    manager.setComponentList("transform", this.transforms)
    manager.setComponentList("bound", this.bounds)
    manager.setComponentList("movable", this.movables)
    manager.event.add("add", (entity) => {
      if (!entity.has('transform')) return
      this.transforms.push(
        entity.get("transform")
      )
      this.transforms.push(
        entity.get("transform")
      )
      this.bounds.push(
        entity.get("transform")
      )
    })
    manager.event.add("remove", entity => {
      if (!entity.has('transform')) return
      this.transforms.push(
        entity.get("transform")
      )
      this.transforms.push(
        entity.get("transform")
      )
      this.bounds.push(
        entity.get("transform")
      )
    })
  }
  update(dt) {
    for (var i = 0; i < this.transforms.length; i++) {
      if (this.movables[i] == void 0) return
      this.solver(
        this.transforms[i],
        this.movables[i],
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
    rotation.radian += rotation.radian * dt
    orientation.radian += rotation.radian * dt
    acceleration.set(0, 0)
    torque.radian = 0
  }
}