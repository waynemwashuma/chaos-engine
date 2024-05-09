import { Vector2 } from "../math/index.js"

//This is supposed to be `Image()` but that is already taken.
export class Picture {
  /**
   * @type {ArrayBuffer}
   */
  raw
  /**
   * @type {Vector_like}
   */
  dimensions
  /**
   * @param {ArrayBuffer} buffer
   * @param {Vector_like} dimensions
   */
  constructor(buffer, dimensions) {
    this.raw = buffer
    this.dimensions = dimensions
  }
  static PLACEHOLDER = new Picture(
    new ArrayBuffer(),
    new Vector2()
  )
}