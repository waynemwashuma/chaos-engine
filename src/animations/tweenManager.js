import {System} from "../ecs/index.js"

export class TweenManager extends System {
  objects = []
  init(manager) {
    manager.setComponentList("tween", this.objects)
  }

  update(dt) {
    for (var i = 0; i < this.objects.length; i++) {
      let tween = this.objects[i]

      tween.update(dt)
    }
  }
}