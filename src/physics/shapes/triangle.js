import {Shape} from"./shape.js"
import {Vector} from "../../utils/index.js"

class Triangle extends Shape {
  constructor(pos,length1,length2,angle) {
    let l1 = new Vector().multiply(length1) 
    let l2 = Vector.fromDeg(angle).multiply(length2)
    let xRatio = l2.dot()
    super(pos, [
       new Vector(
         pos.x - l1.x,
         pos.y - l2.y/2
        ),
        new Vector(
         pos.x + l1.x,
         pos.y - l2.y/2
        ),
        new Vector(
          pos.x + l2.x,
          pos.y + l2.y / 2
        )
      ])
  }
}

export{
  Triangle
}