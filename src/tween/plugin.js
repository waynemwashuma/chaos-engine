import {
  Position2DTween,
  Orientation2DTween,
  Scale2DTween,
  Position3DTween,
  Orientation3DTween,
  Scale3DTween,
  TweenFlip,
  TweenRepeat
} from "./components/index.js"
import { throws } from "../logger/index.js"
import { Angle, Color, Vector2, lerp } from "../math/index.js"

//TweenPlugin<T> where `T: Lerp`
//e.g TweenPlugin<Position2D>, TweenPlugin<Scale2D> e.t.c...
//For now,this plugin will be limited to Position,Orientation and Scale (2d and 3d variants) components.
/**
 * 
 */
export class TweenPlugin {
  /**
   * @param {Registry} manager
   */
  register(manager) {
    manager
      .registerType(Position2DTween)
      .registerType(Orientation2DTween)
      .registerType(Scale2DTween)
      .registerType(Position3DTween)
      .registerType(Orientation3DTween)
      .registerType(Scale3DTween)
      .registerType(TweenFlip)
      .registerType(TweenRepeat)

    manager.registerSystem(updatePosition2DTween)
    generateTweenedFn(manager, "position2dtween")
    manager.registerSystem(updateOrientation2DTween)
    generateTweenedFn(manager, "orientation2dtween")
    manager.registerSystem(updateScale2DTween)
    generateTweenedFn(manager, "scale2dtween")
    manager.registerSystem(updatePosition3DTween)
    generateTweenedFn(manager, "position3dtween")
    manager.registerSystem(updateOrientation3DTween)
    generateTweenedFn(manager, "orientation3dtween")
    manager.registerSystem(updateScale3DTween)
    generateTweenedFn(manager, "scale3dtween")
  }
}

//the difference between updating systems is how they are lerped.
//In another compiled language,these could be one templated function.

function generateTweenedFn(manager, name) {
  //`repeatTween<T>` where `T => Tween<T>`.
  function repeatTween(manager) {
    const query = manager.query([name, "tweenrepeat"])
    query.each(([tween, _]) => {
      if (tween.timeTaken >= tween.duration) {
        tween.timeTaken = 0
      }

    })
  }

  //`flipTween<T>` where `T => Tween<T>`
  function flipTween(manager) {
    const query = manager.query([name, "tweenflip"])
    query.each(([tween, _]) => {
      if (tween.timeTaken >= tween.duration) {
        const temp = tween.to
        tween.to = tween.from
        tween.from = temp
      }
    })
  }

  function updateTimerTween(manager) {
    const dt = manager.getResource("virtualclock").delta
    const query = manager.query([name])

    query.each(([tween]) => {
      tween.timeTaken = Math.min(tween.timeTaken + dt, tween.duration)
    })
  }
  manager.registerSystem(flipTween)
  manager.registerSystem(repeatTween)
  manager.registerSystem(updateTimerTween)
}
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

function updateOrientation2DTween(manager) {
  const query = manager.query(["position2d", "orientation2dtween"])

  query.each(([orientation, tween]) => {
    const t = tween.easing(
      tween.timeTaken / tween.duration
    )
    orientation.value = lerp(tween.from.value, tween.to.value, t)
  })
}

function updateScale2DTween(manager) {
  const query = manager.query(["scale2d", "scale2dtween"])

  query.each(([scale, tween]) => {
    const t = tween.easing(
      tween.timeTaken / tween.duration
    )
    scale.x = lerp(tween.from.x, tween.to.x, t)
    scale.y = lerp(tween.from.y, tween.to.y, t)
  })
}

function updatePosition3DTween(manager) {
  const query = manager.query(["position3d", "position3dtween"])

  query.each(([position, tween]) => {
    const t = tween.easing(
      tween.timeTaken / tween.duration
    )
    position.x = lerp(tween.from.x, tween.to.x, t)
    position.y = lerp(tween.from.y, tween.to.y, t)
    position.z = lerp(tween.from.z, tween.to.z, t)
  })
}

function updateOrientation3DTween(manager) {
  const query = manager.query(["orientation3d", "orientation3dtween"])

  query.each(([orientation, tween]) => {
    const t = tween.easing(
      tween.timeTaken / tween.duration
    )
    orientation.x = lerp(tween.from.x, tween.to.x, t)
    orientation.y = lerp(tween.from.y, tween.to.y, t)
    orientation.z = lerp(tween.from.z, tween.to.z, t)
    orientation.w = lerp(tween.from.w, tween.to.w, t)
  })
}

function updateScale3DTween(manager) {
  const query = manager.query(["scale3d", "scale3dtween"])

  query.each(([scale, tween]) => {
    const t = tween.easing(
      tween.timeTaken / tween.duration
    )
    scale.x = lerp(tween.from.x, tween.to.x, t)
    scale.y = lerp(tween.from.y, tween.to.y, t)
    scale.z = lerp(tween.from.z, tween.to.z, t)
  })
}