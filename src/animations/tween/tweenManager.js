import {System} from "../../ecs/index.js"

export class TweenManager extends System {
  /**
   * @type {Tween[]}
  */
  objects = []
  /**
   * @inheritdoc
   * @param {Manager} manager
  */
  init(manager) {
    manager.setComponentList("tween", this.objects)
  }
  /**
   * @inheritdoc
  */
  update(dt) {
    for (var i = 0; i < this.objects.length; i++) {
      let tween = this.objects[i]

      tween.update(dt)
    }
  }
}