import {BufferGeometry} from "./geometry.js"
import {Vector2} from "../../math/index.js"

export class BoxGeometry extends BufferGeometry{
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width,height){
    let v1 = new Vector2(-width / 2, -height / 2)
    let v2 = new Vector2(-width / 2, height / 2)
    let v3 = new Vector2(width / 2, height / 2)
    let v4 = new Vector2(width / 2, -height / 2)
    super()
    BufferGeometry.setAttribute(this, "position", [v1, v2, v3, v4])
    BufferGeometry.initCanvas2D(this)
  }
}