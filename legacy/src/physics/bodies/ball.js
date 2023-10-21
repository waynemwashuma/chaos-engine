import {Body} from "./body.js"
import {Circle} from "../shapes/index.js"
import {Vector} from"../../utils/vector.js"

class Ball extends Body{
  constructor(position,radius) {
    super(position,new Circle(new Vector(),radius))
    this.inertia = (radius**2)*this.mass*0.5
  }
  static calcInertia(body){
    return (body.r**2)*body.mass*0.5
  }
}

export{
  Ball
}