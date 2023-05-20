import { Shape } from "./shape.js"
import { Vector, sq } from "../../utils/index.js"

class Rectangle extends Shape {
  height = 0
  width = 0
  constructor(width, height,offset,offsetAngle) {
    let v1 = new Vector(-width / 2, -height / 2)
    let v2 = new Vector(-width / 2, height / 2)
    let v3 = new Vector(width / 2, height / 2)
    let v4 = new Vector(width / 2, -height / 2)
    super([v1, v2, v3, v4],offset,offsetAngle)
    this.height = height
    this.width = width
  }
  static calcInertia(mass, width, height) {
    return mass * (sq(width) + sq(height)) / 12
  }
  get area() {
    return this.width * this.height
  }

}

export {
  Rectangle
}