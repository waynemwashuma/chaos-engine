/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 * 
 * Realized i need to massively change this to make it work well.
 */
export class Touch {
  /**
   * @type {TouchEvent[]}
   */
  touches = []
  /**
   * @type {number}
   */
  clickCount = 0

}
export class TouchPlugin {
  register(manager) {
    const eh = manager.getResource("domeventhandler")

    if (!eh) return error("The resource `DOMEventHandler()` is required to be set first before `MousePlugin()` is registered.")

    const touch = new Touch()
    manager.setResource(touch)
    eh.add('touchstart', (e) => {
      touch.touches = e.touches
      e.preventDefault()
    })
    eh.add('touchend', e => {
      touch.touches = e.touches
      e.preventDefault()
    })

    eh.add('touchmove', e => {
      e.preventDefault()
    })
    eh.add('touchcancel',e =>{
      e.preventDefault()
    })
  }
}