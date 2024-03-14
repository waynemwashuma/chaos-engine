import { Tween } from "./tween.js"

/**
 * @template T
 */
export class TweenManager {
  /**
   * @type {Tween<T>[]}
   */
  objects = []
  /**
   * @template U
   * @param {TweenManager<U>} manager
   * @param {number} dt
   */
  static update(manager,dt) {
    for (var i = 0; i < manager.objects.length; i++) {
      Tween.update(manager.objects[i],dt)
    }
  }
  /**
   * @param {Tween<T>} tween
   */
  add(tween){
    this.objects.push(tween)
  }
}