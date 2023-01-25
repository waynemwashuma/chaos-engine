let canvas = document.createElement("canvas")
let img = new Image()
let img2 = new Image()
let ctx = canvas.getContext('2d')
class Sprite{
  _frame = 0
  _accumulator = 0
  _maxAcc = 1/60 *1000
  constructor(img,w,h,loop){
    img.onload = e=>{
      this.imgs = this.splitSprite(img,w)
    }
    this.width = w || 0
    this.height = h|| 0
    this.loop = false
    this.active = false
  }
  draw(img,x,y,w,h){
    canvas.width = w
    canvas.height = h
    ctx.drawImage(img,x,y,w,h,0,0,w,h)
    return canvas.toDataURL("image/png")
  }
  splitSprite(sprite,w){
    let j = []
    for (let i = 0; i*w + w<=sprite.width; i++) {
      let img = new Image()
      img.src = this.draw(sprite,i*w,0,w,sprite.height)
      j[i] = img
    }
    return j
  }
  reset(){
    this._frame -= this.imgs?.length || this._frame
  }
  calcFrame(dt){
    this._accumulator += dt
    if(this._accumulator >= this._maxAcc){
      this._frame++
      this._accumulator = 0
    }
    if(this._frame >= this.imgs.length)
      this.reset()
  }
  update(dt){
    if(!this.imgs)return img2
    if(!this.active)return img2
    this.calcFrame(dt)

    return this.imgs[this._frame]
  }
  play(){
    this.active = true
  }
  pause(){
    this.active = false
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