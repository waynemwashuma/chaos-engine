import {Sprite} from "./sprite.js"

class ImageSprite extends Sprite{
  _index = 0
  _maxFrame = 0
  _frame = 0
  _accumulator = 0
  _dt = 0
  frameRate = 1/60
  _maxFrames = null
  width = 0
  height = 0
  frameWidth = 0
  frameHeight = 0
  constructor(img, divX, divY) {
    super()
    this.img = img
    this._maxFrame = (divX || 1) - 1
    img.onload = () => {
      this.width = img.width
      this.height = img.height
      this.frameWidth = img.width / (divX || 1)
      this.frameHeight = img.height / (divY || 1)
    }
    this.width = 0
    this.height = 0
    this.frameWidth = 0
    this.frameHeight = 0
  }
  setMaxFrames(...max){
    this._maxFrames = max
  }
  setIndex(index){
    this._maxFrame = this._maxFrames[index]
    this._index = index
    this._frame = 0
  }
  /**
   * @param {Renderer} ctx
   */
  draw(renderer) {
    renderer.drawImage(
      this.img,
      -this.frameWidth/2,
      -this.frameHeight/2,
      this.frameWidth,
      this.frameHeight,
      this._frame,
      this._index
    )
  }
  update(renderer,dt){
    super.update(renderer,dt)
    this._accumulator += dt
    if(this._accumulator < this._frameRate) return
    this._accumulator = 0
    this._frame += 1
    if(this._frame > this._maxFrame)
    this._frame = 0
    
  }
}

export {
  ImageSprite
}