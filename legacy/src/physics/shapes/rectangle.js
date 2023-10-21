import {Shape} from"./shape.js"
import {Vector} from "../../utils/vector.js"

class Rectangle extends Shape {
  constructor(pos, width, height) {
    let v1 = new Vector(pos.x - width / 2, pos.y - height / 2)
    let v2 = new Vector(pos.x - width / 2, pos.y + height / 2)
    let v3 = new Vector(pos.x + width / 2, pos.y + height / 2)
    let v4 = new Vector(pos.x + width / 2, pos.y - height / 2)
    super(pos, [v1, v2, v3, v4])
    this.length = height
    this.width = width
    this.type = "rectangle"
  }
  getInertia(mass) {
    return mass * (this.length ** 2 + this.width ** 2) / 12
  }

}

export{
  Rectangle
}