import { Vector }from "../../math/index.js"
import { vertices } from "../utils/index.js"

export class BufferGeometry{
  constructor(vertices){
    this.vertices = vertices || []
  }
  render(ctx){
    vertices(ctx,this.vertices,true)
  }
}