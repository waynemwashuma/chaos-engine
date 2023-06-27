/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 * 
 * Realized i need to massively change this to make it work well.
 */
class Touch {
  constructor(eh) {
    this.clickCount = 0;
    this.touches = []
    this.init(eh)
  }
  /**
   * Checks to see if the position is within the dragbox of the first two touches.
   * Not yet fully implemented
   */
  inDragBox(pos) {
    if (pos.x > this.dragLastPosition.x && pos.x < this.dragLastPosition.x + this.position.x &&
      pos.y > this.dragLastPosition.y && pos.y < this.dragLastPosition.y + this.position.y) {
      return false
    }
    return true
  }
  /**
   * Adds Touch events to the DOM.
   * 
   * @param {DOMEventHandler} eh
   */
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