import { Body } from "./body.js"
import { Vector } from "../../utils/vector.js"
import { Rectangle } from "../shapes/index.js"
class Box extends Body {
  constructor(position, w, h) {
    super(position, new Rectangle({ x: 0, y: 0 }, w, h))
    this.inertia = this.mass * (w ** 2 + h ** 2) / 12
  }
  static calcInertia(body) {
    let { width, length } = body.components[0]
    return body.mass * (width ** 2 + length ** 2) / 12
  }
}
console.log(1 * (30 * 30 + 30 * 30) / 12);
export {
  Box
}