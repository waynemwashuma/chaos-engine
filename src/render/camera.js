import {Transform} from '../intergrator/index.js'
import { Vector2 } from '../math/index.js'
import { deprecate } from '../logger/index.js'

export class Camera2D {
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
/**
 * @deprecated
*/
export class Camera extends Camera2D{
  constructor(){
    super()
    deprecate("Camera()","Camera2D()")
  }
}