import {System} from "../ecs/index.js"

export class TweenManager extends System {
  objects = []
  init() {
    manager.setComponentList("sprite", this.objects)
  }

  update(dt) {
    for (var i = 0; i < this._objects.length; i++) {
      let tween = this._objects[i]

      tween.update(dt)
    }
  }
}