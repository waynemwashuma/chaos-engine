import {BoundingBox} from "../physics/AABB/boundingBox.js"
import { Component } from "./component.js"

class Bounds extends Component{
  bounds = new BoundingBox()
}
3
export {
  Bounds
}