import { KeyboardPlugin } from "./keyboard.js";
import { MousePlugin } from "./mouse.js";
import { TouchPlugin } from "./touch.js";
import { DOMEventHandler } from "../events/index.js"
import { deprecate } from "../logger/index.js"

export class InputPlugin {
  register(manager) {
    manager.setResource(new DOMEventHandler())
    manager.registerPlugin(new TouchPlugin())
    manager.registerPlugin(new MousePlugin())
    manager.registerPlugin(new KeyboardPlugin())
  }
}

/**
 * 
 * @deprecated
 * This handles all inputs from the mouse,touch and keyboards.
 * 
 */
export class Input {
  constructor(eventHandler) {
    deprecate("Input()","InputPlugin()")
    throws("Breaking deprecation encountered")
  }
}