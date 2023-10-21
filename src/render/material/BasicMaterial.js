export class BasicMaterial{
  constructor(){
    this.fill = "red"
    this.lineWidth = 1
    this.stroke = "green"
    this.wireframe = true
  }
  render(ctx){
    if(!this.wireframe){
      ctx.fill(this.fill)
    }
    ctx.stroke(this.stroke,this.lineWidth)
  }
}