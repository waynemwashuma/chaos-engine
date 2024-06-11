import { KeyboardPlugin } from "./keyboard.js";
import { MousePlugin } from "./mouse.js";
import { TouchPlugin } from "./touch.js";
import { DOMEventHandler } from "../events/index.js"
import { deprecate } from "../logger/index.js"

export class InputPlugin {
  constructor(options = {}){
    options.target = options.target ?? document.body
    this.options = options
  }
  register(manager) {
    manager.setResource(new DOMEventHandler(this.options.target))
    manager.registerPlugin(new TouchPlugin())
    manager.registerPlugin(new MousePlugin())
    manager.registerPlugin(new KeyboardPlugin())
  }
}