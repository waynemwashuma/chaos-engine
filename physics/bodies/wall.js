import {Vector} from"/utils/vector.js"
import {Body} from"./body.js"
import {Line} from "../shapes/line.js"

class Wall extends Body {
  constructor(x, y, l) {
    let line = new Line(new Vector(), l)
    super(new Vector(x, y), line)
    this.mass = 0
    this.layer = 0
  }
}

export{
  Wall
}