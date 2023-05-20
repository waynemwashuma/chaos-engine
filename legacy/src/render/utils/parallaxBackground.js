class Layer{
  constructor(img){
    this.img = img
  }
  draw(ctx,x,y){
    ctx.drawImage(this.img,x,y)
  }
}

class ParalaxBackground {
  constructor(imgs) {
    this.layers =[]
    imgs.forEach(img=>{
      this.layers.push()
    })
  }
  draw(ctx){
    this.layers.forEach(layer=>{
      layer.draw(ctx)
    })
  }
}

export {
  ParalaxBackground
}