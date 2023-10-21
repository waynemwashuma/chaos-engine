import {Mesh} from "./sprite.js"

class BodyMesh extends Mesh{
  constructor(options){
    super({})
    this.options = options ||{}
  }
  update(ctx){
    ctx.fillStyle = "black"
    this.body.draw(ctx,this.options.drawNormals)
    if(this.options.drawVelocity)this.body.drawVelocity(ctx)
    if (this.options.drawBounds)
    this.body.bounds.draw(ctx)
  }
  init(parent){
    this.body = parent.body
    super.init(parent)
  }
}

export{
  BodyMesh
}