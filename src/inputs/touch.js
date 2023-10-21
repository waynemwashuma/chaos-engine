/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 * 
 * Realized i need to massively change this to make it work well.
 */
class Touch {
  /**
   * @type TouchEvent[]
   */
  touches = []
  /**
   * @type number
  */
  clickCount = 0
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.init(eh)
  }
  /**
   * Checks to see if the position is within the dragbox of the first two touches.
   * Not yet fully implemented
   * 
   * @param {Vector_like} pos
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
  /**
   * @private
   */
  _onMove = (e) => {
    e.preventDefault()
  }
  /**
   * @private
   */
  _onDown = (e) => {
    this.touches = e.touches
  }
  /**
   * @private
   */
  _onUp = (e) => {
    this.touches = e.touches
  }
  update() {}
}

export {
  Touch
}