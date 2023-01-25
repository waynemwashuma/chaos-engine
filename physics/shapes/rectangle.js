import {Shape} from"./shape.js"
import {Vector} from "/utils/vector.js"

class Rectangle extends Shape {
  constructor(pos, width, height, mass) {
    let v1 = new Vector(pos.x - width / 2, pos.y - height / 2)
    let v2 = new Vector(pos.x - width / 2, pos.y + height / 2)
    let v3 = new Vector(pos.x + width / 2, pos.y + height / 2)
    let v4 = new Vector(pos.x + width / 2, pos.y - height / 2)
    super(pos, [v1, v2, v3, v4], mass)
    this.length = height
    this.width = width
    this._inertia = 12 || this.getInertia()
    this.type = "rectangle"
  }
  getInertia() {
    return this.mass * (this.length ** 2 + this.width ** 2) / 12
  }

}

export{
  Rectangle
}