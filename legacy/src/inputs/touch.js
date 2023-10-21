class Touch {
  constructor(eh) {
    this.clickCount = 0;
    this.touches = []
    this.init(eh)
  }
  inDragBox(pos) {
    if (pos.x > this.dragLastPosition.x && pos.x < this.dragLastPosition.x + this.position.x &&
      pos.y > this.dragLastPosition.y && pos.y < this.dragLastPosition.y + this.position.y) {
      return false
    }
    return true
  }
  init(eh) {
    eh.add('touchstart', this._onDown)
    eh.add('touchend', this._onUp)
    eh.add('touchmove', this._onMove)
  }
  _onMove = (e) => {
    e.preventDefault()
    this.onmove(e)
  }
  _onDown = (e) => {
    this.touches = e.touches
    this.ondown(e)
  }
  _onUp = (e) => {
    this.touches = e.touches
    this.onup(e)
  }
  onmove(e) {}
  onclick(e) {}
  ondown(e) {}
  onup(e) {}
  onwheel(e) {}
  update() {}
}

export {
  Touch
}