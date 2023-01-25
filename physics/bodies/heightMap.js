import {Vector} from"/utils/vector.js"
import {Body} from"./body.js"
import {Line} from "../shapes/line.js"

class HeightMap extends Body {
  constructor(step, heights) {
    let l = [],
      j = []
    for (let i = 0; i < heights.length; i++) {
      l.push(new Vector(step * i, heights[i]))
    }
    for (let i = 1; i < l.length; i++) {
      let line = new Line(l[i - 1], l[i])
      j.push(line)
    }
    super(new Vector(), ...j)
    this.mass = 0
  }
}
export{
  HeightMap
}