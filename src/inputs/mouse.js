/**
 * This handles all inputs from mouse and touchpad on laptops
 */

class Mouse {
  /**
   * Number of times the mouse has been clicked.
   * 
   * @type number
   */
  clickCount = 0
  /**
   * If the mouse is being dragged or not.
   * 
   * @type boolean
   */
  dragging = false
  /**
   * The position from which the mouse is being dragged.
   * 
   * @type Vector_like
   */
  dragLastPosition = { x: 0, y: 0 }
  /**
   * Distance vector between the last frame's position and current position.
   * 
   * @type Vector_like
   */
  delta = { x: 0, y: 0 }
  /**
   * Position of the mouse in current frame.
   * 
   * @type Vector_like
   */
  position = { x: 0, y: 0 }
  /**

   * Position of the mouse in last frame.

   * 
   * @type Vector_like
   */
  lastPosition = { x: 0, y: 0 }
  /**
   * If the left mouse button is pressed or not.
   * 
   * @type boolean
   */
  leftbutton = false
  /**
   * If the right mouse button is pressed or not.
   * 
   * @type boolean
   */
  rightbutton = false
  /**
   * @param {DOMEventHandler} eh
   */
  constructor(eh) {
    this.init(eh)
  }
  /**
   * Checks to see if the vector provided is
   * within a dragbox if mouse is being dragged with a right or left button down
   * 
   * @param {Vector_like} pos an object containing x and y coordinates to be checked
   * @returns {Boolean}
   * 
   */
  inDragBox(pos) {
    if (!this.dragging) return false
    if (pos.x > this.dragLastPosition.x && pos.x < this.position.x &&
      pos.y > this.dragLastPosition.y &&
      pos.y < this.position.y) {
      return false
    }
    return true
  }
  /**
   * Initializes the mouse by appending to the DOM
   *
   * @param {DOMEventHandler} eh
   */
  init(eh) {
    eh.add('click', this._onClick)
    eh.add('mousedown', this._onDown)
    eh.add('mouseup', this._onUp)
    eh.add('mousewheel', this._onWheel)
    eh.add('mousemove', this._onMove)
    eh.add("contextmenu", this._onContextMenu)
  }
  /**
   * @private
   */
  _onClick = (e) => {
    ++this.clickCount
  }
  /**
   * @private
   */
  _onMove = (e) => {
    this.position.x = e.clientX;

    this.position.y = e.clientY

    if (this.lastPosition.x === undefined) {
      this.lastPosition = { ...this.position }
    }
    this.delta.x = this.position.x - this.lastPosition.x
    this.delta.y = this.position.y - this.lastPosition.y
    this.dragging = this.leftbutton || this.rightbutton ? true : false
    if (!this.dragging) {
      this.dragLastPosition.x = e.clientX;
      this.dragLastPosition.y = e.clientY
    }
  }
  /**
   * @private
   */
  _onDown = (e) => {
    switch (e.button) {

      case 0:

        this.leftbutton = true
        break;
      case 2:
        this.rightbutton = true
        break;
    }
  }
  /**
   * @private
   */
  _onUp = (e) => {
    switch (e.button) {
      case 0:
        this.leftbutton = false
        break;
      case 2:
        this.rightbutton = false
        break;
    }
  }
  /**
   * @private
   */
  _onWheel = (e) => {
  }
  /**
   * @private
   */
  _onContextMenu = (e) => {
    e.preventDefault()
  }
  /**
   * Updates the mouse internals.
   */
  update() {
    this.lastPosition = { ...this.position }
  }
}

export {
  Mouse
}