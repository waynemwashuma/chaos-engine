import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { Touch } from "./touch.js";
import { DOMEventHandler } from "../events/index.js"

/**
 * @author Wayne Mwashuma
 * This handles all inputs from the mouse,touch and keyboards.
 */
class Input {
  constructor(eventHandler) {
    this.DOMEventHandler = eventHandler || new DOMEventHandler()
    this.mouse = new Mouse(this.DOMEventHandler);
    this.touch = new Touch(this.DOMEventHandler);
    this.keyboard = new Keyboard(this.DOMEventHandler);
  }
  update() {
    this.mouse.update()
    this.touch.update()
  }
  dispose() {
    //TODO remove eventlisteners
    this.mouse.dispose()
    this.keyboard.dispose()
    this.touch.dispose()
  }
}
export {
  Input
}