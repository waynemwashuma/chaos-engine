import {Vector} from"../../utils/index.js"
import {Body} from"./body.js"
import {Line} from "../shapes/index.js"

class Wall extends Body {
  constructor(x,y, l) {
    let line = new Line(new Vector(), l)
    super(new Vector(x,y), line)
    this.mass = 0
    this.mask.layer = 0
  }
}

export{
  Wall
}