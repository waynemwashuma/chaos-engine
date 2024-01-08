import { System } from "../ecs/index.js"

export class RaycastManager extends System {
  /**
   * @private
   * @type {Raycaster[]}
   */
  objects = []
  /**
   * @private
   * @type {Body[]}
   */
  bodies = null
  /**
   * @inheritdoc
   * @param {Manager} manager
   */
  init(manager) {
    if (!manager.getSystem("world"))
      throw "World is required for running Raycast system."
    manager.setComponentList("raycaster", this.objects)
    this.bodies = manager.getComponentList("body")

  }
  /**
   * @inheritdoc
   */
  update(dt) {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this.bodies)
    }
  }
}