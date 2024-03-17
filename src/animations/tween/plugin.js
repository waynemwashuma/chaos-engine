import { throws } from "../../logger/index.js"
import { Tween } from "./tween.js"

/**
 * @template T
 */
export class TweenPlugin {
  /**
   * @param {any} name
   */
  constructor(name) {
    if (!name) throws("A `TweenPlugin` should be given a name to avoid conflict with other `TweenPlugin`s")
    this.name = name
  }
  /**
   * @param {{ setResource: (arg0: any, arg1: never[]) => void; registerSystem: (arg0: (manager: any) => void) => void; }} manager
   */
  register(manager) {
    const name = this.name
    manager.setResource(name, [])
    manager.registerSystem(manager => {
      const dt = manager.getResource("delta")
      const tweens = manager.getResource(name)

      for (let i = 0; i < tweens.length; i++) {
        Tween.update(tweens[i], dt)
      }
    })
  }
}
/**
 * @typedef TweenPluginOptions
 * @property {string} name
 */