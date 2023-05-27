import { car } from "./car.js"
import { bridge } from "./bridge.js"
import { stacking } from "./stacking.js"
import { pyramid } from "./pyramid.js"
import { random } from "./random.js"

import { Manager, DebugMesh } from "/src/index.js"
import { CanvasBounds } from "/assets/index.js"

export const demos = {
  manager: Manager.Default(),
  init: function(selector) {
    let renderer = this.manager.getSystem("renderer")
    renderer.bindTo(selector)
    renderer.setViewport(innerWidth, innerHeight)
    window.onresize = () => {
      renderer.setViewPort(innerWidth, innerHeight)
    }
    renderer.addUI(new DebugMesh(this.manager))
  },
  setup: function(name) {
    this.manager.clear()
    this.manager.add(new CanvasBounds())
    switch (name) {
      case "random":
        random(this.manager)
        break
      case "bridge":
        bridge(this.manager)
        break
      case "car":
        car(this.manager)
        break
      case "pyramid":
        pyramid(this.manager)
        break
      case "stacking":
        stacking(this.manager)
        break
    }
  }
}