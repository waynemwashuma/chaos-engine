import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { Touch } from "./touch.js";
import { DOMEventHandler } from "../events/index.js"

/**
 * This handles all inputs from the mouse,touch and keyboards.
 * 
 */
export class Input {
  /**
   * This attaches callbacks to the DOM.
   * 
   * @type {DOMEventHandler}
  */
  DOMEventHandler
  /**
   * 
   * @type {Mouse}
  */
  mouse
  /**
   * 
   * @type {Touch}
  */
  touch
  /**
   * 
   * @type {Keyboard}
  */
  keyboard
  /**
   * @param {DOMEventHandler} eventHandler
  */
  constructor(eventHandler) {
    this.DOMEventHandler = eventHandler || new DOMEventHandler()
    this.mouse = new Mouse(this.DOMEventHandler);
    this.touch = new Touch(this.DOMEventHandler);
    this.keyboard = new Keyboard(this.DOMEventHandler);
  }
  /**
   * Updates all inputs.
  */
  update() {
    this.mouse.update()
    this.touch.update()
  }
  /**
   * Remove all bindings to the DOM for all input types.
  */
  dispose() {
    //TODO remove eventlisteners
    //this.mouse.dispose()
    //this.keyboard.dispose()
    //this.touch.dispose()
  }
}