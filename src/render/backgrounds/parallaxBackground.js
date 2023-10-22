class Layer{
  speed = 1
  constructor(img){
    this.img = img
  }
  draw(ctx,x,y){
    ctx.drawImage(this.img,x,y)
  }
  update(ctx,dt){
    
  }
}

class ParallaxBackground {
  constructor(...layers) {
    this.layers =layers
  }
  update(ctx,dt){
    this.layers.forEach(layer=>{
      layer.draw(ctx,dt)
    })
  }
}

export {
  ParallaxBackground,
  Layer
}