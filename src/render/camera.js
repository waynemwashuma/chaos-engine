import { Angle, Vector, Matrix } from "../math/index.js"
class Camera {
  /**
   * @private
   * @type Vector
   */
  _position = new Vector()
  /**
   * @private
   * @type Vector
   */
  transformMatrix = new Matrix()
  /**
   * @type Renderer
   */
  renderer = null
  /**
   * @param {Renderer} renderer
   */
  constructor(renderer) {
    this.renderer = renderer
  }
  /**
   * @type Vector
   */
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  update() {}
  dispose() {
    this.renderer = null
  }
}
export {
  Camera
}