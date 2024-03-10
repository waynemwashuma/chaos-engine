import { BufferGeometry } from "./geometry.js"
import {Vector2} from "../../math/index.js"

export class LineGeometry extends BufferGeometry {
  /**
   * @param {number} length
   */
  constructor(length) {
    let start = new Vector2(1).multiply(length / 2),
      end = new Vector2(1).multiply(-length / 2)
    super([start, end])
  }
}