import {Transform} from '../ecs/transformComponent.js'
class Camera {
  /**
   * @readonly
   * @type Transform
   */
  transform = new Transform()

  constructor() { }
  /**
   * @type Vector
   */
  get position() {
    return this.transform.position
  }
  set position(x) {
    this.transform.position.copy(x)
  }
  update() {}
}
export {
  Camera
}