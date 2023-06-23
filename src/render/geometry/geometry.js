import { Vector }from "../../math/index.js"

export class BufferGeometry{
  constructor(vertices){
    this.vertices = vertices || []
  }
  render(renderer){
    renderer.vertices(this.vertices,true)
  }
}