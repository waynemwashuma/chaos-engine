import { Vector2 } from "../math/index.js"

export class TouchPointer {
  /**
   * @readonly
   * @type {number}
   */
  id = 0
  /**
   * @type {Vector2}
   */
  position = new Vector2()
  /**
   * @type {Vector2}
   */
  lastposition = new Vector2()
  /**
   * @type {Vector2}
   */
  dragPosition = new Vector2()
  /**
   * @type {boolean}
   */
  dragging = false
  /**
   * @type {number}
   */
  tick = 0
  /**
   * @param {number} id
   */
  constructor(id) {
    this.id = id
  }
}

/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 */
export class Touches {
  /**
   * @type {(TouchPointer | null)[]}
   */
  list = new Array(10).fill(null)
  /**
   * @type {number}
   */
  clickCount = 0
  /**
   * @returns {TouchPointer | null}
   */
  getOne() {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i])
        return this.list[i]
    }
    return null
  }
  /**
   * @returns {TouchPointer[]}
   */
  getActive() {
    return this.list.filter(e => !!e)
  }
}

export class TouchPlugin {
  register(manager) {
    const eh = manager.getResource("domeventhandler")

    if (!eh) return error("The resource `DOMEventHandler()` is required to be set first before `MousePlugin()` is registered.")

    const touch = new Touches()
    manager.setResource(touch)

    eh.add('touchstart', touchstart.bind(touch))
    eh.add('touchend', touchend.bind(touch))
    eh.add('touchmove', touchmove.bind(touch))
    eh.add('touchcancel', touchcancel.bind(touch))
  }
}

/**
 * @this {Touches}
 * @param {TouchEvent} e
 */
function touchstart(e) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches.item(i)
    const id = touch.identifier
    const pointer = new TouchPointer(id)

    pointer.position.x = touch.screenX
    pointer.position.y = touch.screenY
    pointer.lastposition.x = touch.screenX
    pointer.lastposition.y = touch.screenY

    if (!this.list[id])
      this.list[id] = pointer
  }
}

/**
 * @this {Touches}
 * @param {TouchEvent} e
 */
function touchmove(e) {
  for (let i = 0; i < e.changedTouches; i++) {
    const touch = e.changedTouches.item(i)
    const id = touch.identifier
    const pointer = this.list[id]

    pointer.lastposition.x = pointer.position.x
    pointer.lastposition.y = pointer.position.y
    pointer.position.x = touch.screenX
    pointer.position.y = touch.screenY
  }
}

/**
 * @this {Touches}
 * @param {TouchEvent} e
 */
function touchend(e) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches.item(i)
    const id = touch.identifier

    this.list[id] = null
  }
}

/**
 * @this {Touches}
 * @param {TouchEvent} e
 */
function touchcancel(e) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches.item(i)
    const id = touch.identifier

    this.list[id] = null
  }

}