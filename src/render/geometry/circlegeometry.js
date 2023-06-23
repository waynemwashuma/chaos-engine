export class CircleGeometry{
  constructor(radius){
    this.radius = radius
  }
  render(renderer){
    renderer.circle(0,0,this.radius)
  }
}