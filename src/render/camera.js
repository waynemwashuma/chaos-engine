import { Angle, Vector, Matrix } from "../math/index.js"
import {Transform} from '../manager/transformComponent.js'
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