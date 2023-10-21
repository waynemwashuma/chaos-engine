let canvas = document.createElement("canvas")
let img = new Image()
let img2 = new Image()
let ctx = canvas.getContext('2d')
class Sprite{
  _frame = 0
  _accumulator = 0
  _maxAcc = 1/60
  maxFrame = 1000
  constructor(img,w,h,loop){
    this.img = img
    this.width = w || 0
    this.height = h|| 0
    this.loop = loop || false
    this.active = false
  }
  draw(ctx,dt){
   ctx.drawImage(this.img,this.width*this._frame,0,this.width,this.img.height,-this.width/2,-this.height/2,this.width,this.height)
   this.calcFrame(dt)
  }
  reset(){
    this._frame = 0
    if(!this.loop)this.active = false
  }
  calcFrame(dt){
    if(!this.active)return;
    this._accumulator += dt
    if(this._accumulator >= this._maxAcc){
      this._frame++
      this._accumulator = 0
    }
    if((this._frame > this.maxFrame))
      this.reset()
  }
  play(){
    this.active = true
  }
  pause(){
    this.active = false
  }
  set frameRate(x){
    this._maxAcc = 1/x
  }
  get frameRate(){
    return 1/this._maxAcc
  }
}
class SpriteSheet{
  _current = null
  playing = null
  constructor(url,actions,w,h){
    let img = new Image()
    img.src = url
    let r = e=>{
      this.sprites = this.splitImg(img,actions,w,h)
      this.play(this.playing)
  }
    img.onload = r
  }
  splitImg(img,actions,w,h){
    let a ={}
    for(let i = 0;i*h + h <= img.height;i++){
      let imgSprite =  new Image()
      imgSprite.src = this.draw(img,0,i*h,img.width,h)
      a[actions[i]] = new Sprite(imgSprite,w)
    }
    img.src = ""
    return a
  }
  draw(img,x,y,w,h){
    canvas.width = w
    canvas.height = h
    ctx.drawImage(img,x,y,w,h,0,0,w,h)
    return canvas.toDataURL("image/png")
  }
  play(action){
    this.playing = action
    if(!this.sprites)return;
    this._current = this.sprites[action]
    this._current.reset()
    this._current.play()
  }
  update(dt){
    let a;
    if(this._current)a = this._current.update(dt)
    return a || img2
  }
}
export{
  Sprite,
  SpriteSheet
}