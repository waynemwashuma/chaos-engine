import { Transform } from '../intergrator/index.js'
import { Angle, Vector2 } from '../math/index.js'
import { Camera } from './camera.js'

export class CamController {
  /**
   * @type {Vector2}
   */
  offset = new Vector2()
  /**
   * @type {Transform}
   */
  transform
  /**
   * @type {Vector2 | null}
   */
  targetPosition = null
  /**
   * @type {Angle | null}
   */
  targetOrientation = null
  /**
   * @param {Camera} camera
   */

  constructor(camera) {
    this.transform = camera.transform
  }
  /**
   * @param {Vector2} position
   * @param {Angle} [orientation]
   */
  follow(position, orientation) {
    this.targetOrientation = orientation || null
    this.targetPosition = position
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setOffset(x, y) {
    this.offset.set(x, y)
  }
  update() {
    if (this.targetPosition)
      this.transform.position.copy(this.targetPosition.clone().sub(this.offset))
    if (this.targetOrientation)
      this.transform.orientation = this.targetOrientation.value
  }
}