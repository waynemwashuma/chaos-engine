import { Shape } from "./shape.js"
import { Vector } from "../../utils/index.js"

class Line extends Shape {
  constructor(pos, length) {
    let start = new Vector(1).multiply(length / 2).add(pos),
      end = new Vector(1).multiply(-length / 2).add(pos)
    super(pos, [start, end])
    this.length = length
  }
}

export {
  Line
}