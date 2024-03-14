import {Transform} from '../intergrator/index.js'
import { Vector2 } from '../math/vector.js'
export class Camera {
  /**
   * @readonly
   * @type {Transform}
   */
  transform = new Transform()

  constructor() { }
  /**
   * @type {Vector2}
   */
  get position() {
    return this.transform.position
  }
  set position(x) {
    this.transform.position.copy(x)
  }
  update() {}
}