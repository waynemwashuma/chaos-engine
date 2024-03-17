import { DOMEventHandler } from "../events/index.js"

/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 * 
 * Realized i need to massively change this to make it work well.
 */
export class Touch {
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
  // @ts-ignore
  _onMove = (e) => {
    e.preventDefault()
  }
  /**
   * @private
   */
  // @ts-ignore
  _onDown = (e) => {
    this.touches = e.touches
  }
  /**
   * @private
   */
  // @ts-ignore
  _onUp = (e) => {
    this.touches = e.touches
  }
  update() {}
}