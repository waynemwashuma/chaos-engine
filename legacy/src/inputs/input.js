import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import { Touch } from "./touch.js";
import {EventHandler} from "./eventHandler.js"

class Input{
    constructor(eventHandler){
      this.eventHandler = eventHandler || new EventHandler()
        this.mouse = new Mouse(this.eventHandler);
        this.touch = new Touch(this.eventHandler);
        this.keyboard = new Keyboard(this.eventHandler);
    }
    update(){
        this.mouse.update()
        this.touch.update()
        this.keyboard.update()
    }
    dispose(){

        //TODO remove eventlisteners
        this.mouse.dispose()
        this.keyboard.dispose()
        this.touch.dispose()
    }
}
export{
  Input
}