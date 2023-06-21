import { Vector } from "../../utils/index.js"

export class BufferGeometry{
  constructor(vertices){
    this.vertices = vertices || []
  }
  render(renderer){
    renderer.vertices(this.vertices,true)
  }
}