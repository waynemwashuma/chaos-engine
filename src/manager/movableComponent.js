import { Component } from "./component.js"
import { Vector, Angle } from "../math/index.js"

class Movable extends Component {
  constructor(x, y, a) {
    super()
    this.velocity = new Vector(x,y)
    this.rotation = new Angle(a)
    this.acceleration = new Vector()
  }
}
export {
  Movable
}