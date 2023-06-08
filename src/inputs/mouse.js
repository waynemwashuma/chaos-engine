/**
 * This handles all inputs from mouse and touchpad on laptops
 */

class Mouse {
  constructor(eh) {
    this.clickCount = 0
    this.dragging = false
    this.dragLastPosition = {}
    this.delta = {x:0,y:0}
    this.position = {x:0,y:0}
    this.lastPosition = { x: 0, y: 0 }
    this.leftbutton = null
    this.rightbutton = null

    this.init(eh)
  }
  /**
   * Checks to see if the vector provided is
   * within a dragbox if mouse is being dragged with a right or left button down
   * 
   * @param {Vector} pos an object containing x and y coordinates to be checked
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
   * @private
   */
  init(eh) {
    eh.add('click', this._onClick)
    eh.add('mousedown', this._onDown)
    eh.add('mouseup', this._onUp)
    eh.add('mousewheel', this._onWheel)
    eh.add('mousemove', this._onMove)
    eh.add("contextmenu", this._onContextMenu)
  }
  _onClick = (e) => {
    ++this.clickCount
    this.onclick(e)
  }
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
    this.onmove(e)
  }
  _onDown = (e) => {
    switch (e.button) {

      case 0:

        this.leftbutton = true
        break;
      case 2:
        this.rightbutton = true
        break;
    }
    this.ondown(e)
  }
  _onUp = (e) => {
    switch (e.button) {
      case 0:
        this.leftbutton = false
        break;
      case 2:
        this.rightbutton = false
        break;
    }
    this.onup(e)
  }
  _onWheel = (e) => {
    this.onwheel(e)
  }
  _onContextMenu = (e) => {
    e.preventDefault()
    this.oncontextmenu(e)
  }

  onmove(e) {}
  onclick(e) {}
  ondown(e) {}
  onup(e) {}
  onwheel(e) {}
  oncontextmenu(e) {}

  update() {
    this.lastPosition = { ...this.position }
  }
}

export {
  Mouse
}