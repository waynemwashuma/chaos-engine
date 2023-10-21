import {Shape} from"./shape.js"
import {Vector} from "../../utils/vector.js"

class Triangle extends Shape {
  constructor(pos, vertices) {
    super(pos, vertices)
  }
}

export{
  Triangle
}