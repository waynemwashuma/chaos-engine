import { BoundingBox, Vector2 } from "../math/index.js"
/**
 * This handles all inputs from mouse and touchpad on PC and laptop.
 */

export class Mouse {
  /**
   * Distance vector between the last frame's position and current position.
   * 
   * @type {Vector2}
   */
  velocity = new Vector2()
  /**
   * Position of the mouse in current frame.
   * 
   * @type {Vector2}
   */
  position = new Vector2()
  /**
   * Number of times the mouse has been clicked.
   * 
   * @type {number}
   */
  clickCount = 0
  /**
   * If the mouse is being dragged or not.
   * 
   * @type {boolean}
   */
  dragging = false
  /**
   * @type {BoundingBox}
   */
  dragBox = new BoundingBox()
  /**
   * The position from which the mouse is being dragged.
   * 
   * @type {Vector2}
   */
  dragPosition = new Vector2()
  /**
   * If the left mouse button is pressed or not.
   * 
   * @type {boolean}
   */
  leftbutton = false
  /**
   * If the right mouse button is pressed or not.
   * 
   * @type {boolean}
   */
  rightbutton = false
}

export class MousePlugin {
  register(manager) {
    const eh = manager.getResource("domeventhandler")

    if (!eh) return error("The resource `DOMEventHandler()` is required to be set first before `MousePlugin()` is registered.")

    const mouse = new Mouse()
    manager.setResource(mouse)
    eh.add('click', e => ++this.clickCount)
    eh.add('mousedown', e => {
      switch (e.button) {
        case 0:
          mouse.leftbutton = true
          break;
        case 2:
          mouse.rightbutton = true
          break;
      }
    })
    eh.add('mouseup', e => {
      switch (e.button) {
        case 0:
          mouse.leftbutton = false
          break;
        case 2:
          mouse.rightbutton = false
          break;
      }
    })
    eh.add('mousemove', e => {
      mouse.velocity.x = e.clientX - mouse.position.x
      mouse.velocity.y = e.clientY - mouse.position.y
      mouse.position.x = e.clientX
      mouse.position.y = e.clientY

      mouse.dragging = mouse.leftbutton || mouse.rightbutton
      if (!mouse.dragging) {
        mouse.dragPosition.x = e.clientX;
        mouse.dragPosition.y = e.clientY
      }
      if (dragging) {
        if (mouse.position.x < mouse.dragPosition.x) {
          mouse.dragBox.min.x = mouse.position.x
          mouse.dragBox.max.x = mouse.dragPosition.x
        }else{
          mouse.dragBox.max.x = mouse.position.x

          mouse.dragBox.min.x = mouse.dragPosition.x
        }
        if (mouse.position.y < mouse.dragPosition.y) {
          mouse.dragBox.min.y = mouse.position.y
          mouse.dragBox.max.y = mouse.dragPosition.y
        } else {
          mouse.dragBox.max.y = mouse.position.y
          mouse.dragBox.min.y = mouse.dragPosition.y
        }
      }

    })
    eh.add('wheel', e => {})
    eh.add("contextmenu", e => {
      e.preventDefault()
    })
  }
}