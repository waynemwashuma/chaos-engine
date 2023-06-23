import { Shape } from "./shape.js"
import { Vector }from "../../math/index.js"

class Line extends Shape {
  constructor(length,offset,offsetAngle) {
    let start = new Vector(1).multiply(length / 2),
      end = new Vector(1).multiply(-length / 2)
    super([start, end],offset,offsetAngle)
    this.length = length
  }
}

export {
  Line
}