import { Shape } from "./shape.js"
import { Vector } from "../../utils/vector.js"

class Line extends Shape {
  constructor(pos, length) {
    let start, end,angle = 0
    if (length instanceof Vector) {
      start = pos
      end = length
      let line = end.clone().sub(start)
      pos =start.clone().add(line.multiply(.5))
      angle = Vector.getAbsDegBtwn(Vector.x_axis,line)
      
    } else {
      start = Vector.x_axis.multiply(length / 2).add(pos)
      end = Vector.x_axis.multiply(-length / 2).add(pos)

    }
    super(pos, [start, end])
    this.length = length
    this.type = "line"
  }
}

export {
  Line
}