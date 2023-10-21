class Mouse {
  constructor(eventHandler) {
    this.clickCount = 0
    this.dragging = false
    this.dragLastPosition = {}
    this.delta = {}
    this.position = {}
    this.lastPosition = {x:0,y:0}
    this.leftbutton = null
    this.rightbutton = null

    this.init(eventHandler)
  }
  inDragBox(pos) {
    if (!this.dragging) return false
    if (pos.x > this.dragLastPosition.x && pos.x < this.dragLastPosition.x + this.position.x &&
      pos.y > this.dragLastPosition.y && pos.y < this.dragLastPosition.y + this.position.y) {
      return false
    }
    return true
  }
  init(eh) {
    eh.add('click',this._onClick)
    eh.add('mousedown',this._onDown)
    eh.add('mouseup',this._onUp)
    eh.add('mousewheel',this._onWheel)
    eh.add('mousemove', this._onMove)
    eh.add("contextmenu",this._onContextMenu)
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
  _onDown = (e)=>{
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
  _onUp =(e)=>{
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
  _onWheel=(e)=>{
    this.onwheel(e)
  }
  _onContextMenu=(e)=>{
    e.preventDefault()
    this.oncontextmenu(e)
  }
  
  onmove(e) {}
  onclick(e) {}
  ondown(e) {}
  onup(e) {}
  onwheel(e) {}
  oncontextmenu(e){}
  
  update() {
    this.lastPosition = { ...this.position }
  }
}

export {
  Mouse
}