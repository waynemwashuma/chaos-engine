import { Vector2 } from '../math/index.js'

export class CamController {
  /**
   * @readonly
   * @type Vector2
   */
  offset = new Vector2()
  /**
   * @param {Camera} camera
   */
  constructor(camera) {
    this.transform = camera.transform
    this.offset = new Vector2()
    this.targetPosition = null
    this.targetOrientation = null
  }
  /**
   * @param { Vector2} position
   * @param {Angle} orientation
   */
  follow(position, orientation = null) {
    this.targetOrientation = orientation
    this.targetPosition = position
  }
  /**
   * @param {Entity} entity
   */
  followEntity(entity) {
    if (!entity.has("transform")) return
    let target = entity.get("transform")
    this.follow(target.position, target.orientation)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setOffset(x, y) {
    this.offset.set(x, y)
  }
  init() {}
  update() {
    if (this.targetPosition)
      this.transform.position.copy(this.targetPosition.clone().sub(this.offset))
    if (this.targetOrientation)
      this.transform.orientation.copy(this.targetOrientation)
  }
}