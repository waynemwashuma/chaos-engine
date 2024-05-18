import { throws } from "../logger/index.js"
import { Angle, Color, Vector2, lerp } from "../math/index.js"
/**
 * 
 */
export class TweenPlugin {
  /**
   * @param {Registry} manager
   */
  register(manager) {
    manager.registerSystem(updatePosition2DTween)
    manager.registerSystem(flipPosition2dTween)
    manager.registerSystem(repeatPosition2dTween)
    manager.registerSystem(updateTimerPosition2DTween)
  }
}

//the difference between updating systems is how they are lerped.
//In another compiled language,these could be one templated function.


//`updateTween<T>` where `T : Lerp` and `T => Tween<T>`.
//`Lerp` is an interface/trait implementing the lerp method.
/**
 * @param {Registry} manager
 */
function updatePosition2DTween(manager) {
  const query = manager.query(["position2d", "position2dtween"])

  query.each(([position, tween]) => {
    const t = tween.easing(
      tween.timeTaken / tween.duration
    )
    position.x = lerp(tween.from.x, tween.to.x, t)
    position.y = lerp(tween.from.y, tween.to.y, t)
  })
}

//`repeatTween<T>` where `T => Tween<T>`.
function repeatPosition2dTween(manager) {
  const query = manager.query(["position2dtween", "tweenrepeat"])
  query.each(([tween, _]) => {
    if (tween.timeTaken >= tween.duration) {
      tween.timeTaken = 0
    }

  })
}

//`flipTween<T>` where `T => Tween<T>`
function flipPosition2dTween(manager) {
  const query = manager.query(["position2dtween", "tweenflip"])
  query.each(([tween, _]) => {
    if (tween.timeTaken >= tween.duration) {
      const temp = tween.to
      tween.to = tween.from
      tween.from = temp
    }
  })
}

function updateTimerPosition2DTween(manager) {
  const dt = manager.getResource("virtualclock").delta
  const query = manager.query(["position2dtween"])
  
  query.each(([tween]) => {
    tween.timeTaken = Math.min(tween.timeTaken + dt, tween.duration)
  })
}
/**
 * @typedef TweenPluginOptions
 * @property {string} name
 */