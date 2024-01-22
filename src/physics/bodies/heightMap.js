import { Vector2} from"../../math/index.js"
import {Body2D} from"./body.js"
import {Line} from "../shapes/index.js"

class HeightMap extends Body2D {
  constructor(step, heights) {
    let l = [],
      j = []
    for (let i = 0; i < heights.length; i++) {
      l.push(new Vector2(step * i, heights[i]))
    }
    for (let i = 1; i < l.length; i++) {
      let line = new Line(l[i - 1], l[i])
      j.push(line)
    }
    super(new Vector2(), ...j)
    this.mass = 0
    this.mask.layer = 0
  }
}
export{
  HeightMap
}