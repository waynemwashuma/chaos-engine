import { car } from "./car.js"
import { bridge } from "./bridge.js"
import { stacking } from "./stacking.js"
import { pyramid } from "./pyramid.js"
import { random } from "./random.js"
import { agents } from "./agents.js"
import { pathfollower } from "./pathfollower.js"
import { constraint } from "./constraints.js"

import {
  Manager,
  DebugMesh,
  Entity,
  Box,
  BodySprite,
  Body
} from "/dist/chaos.module.js"

function createBoundingBox(x, y, w, h, t = 20) {
  let l1 = {
    pos: {
      x: x + w / 2,
      y: y - t / 2
    },
    w: w + 2 * t,
    h: t
  }
  let l2 = {
    pos: {
      x: x + w + t / 2,
      y: y + h / 2
    },
    w: t,
    h
  }
  let l3 = {
    pos: {
      x: x + w / 2,
      y: y + h + t / 2
    },
    w: w + 2 * t,
    h: t
  }
  let l4 = {
    pos: {
      x: x - t / 2,
      y: y + h / 2
    },
    w: t,
    h
  }
  return [l1, l2, l3, l4]
}
class CanvasBounds extends Entity {
  constructor() {
    super()
  }
  init(global) {
    super.init(global)
    let renderer = global.getSystem("renderer")
    let walls = createBoundingBox(30, 30, renderer.width - 60, renderer.height - 80, 1000)
    walls.forEach(w=> {
      let bound = Entity.Default(w.pos.x, w.pos.y)
      let body = new Box(w.w, w.h)
      bound.attach("body", body)
        .attach("mesh", new BodySprite())
      body.type = Body.STATIC
      this.manager.add(bound)
    })
    this.removeSelf()
  }
}

export const demos = {
  manager: new Manager(),
  _demos : {},
  init(selector) {
    let renderer = this.manager.getSystem("renderer")
    renderer.bindTo(selector)
    renderer.setViewport(innerWidth, innerHeight)
    window.onresize = () => {
      renderer.setViewport(innerWidth, innerHeight)
    }
    renderer.addUI(new DebugMesh(this.manager))
  },
  setup(name) {
    this.manager.clear()
    this.manager.add(new CanvasBounds())
    this._demos[name](this.manager)
  },
  register(n,demo){
    this._demos[n] = demo
  }
}

demos.register("car",car)
demos.register("bridge",bridge)
demos.register("random",random)
demos.register("stack",stacking)
demos.register("pyramid",pyramid)
demos.register("agent", agents)
demos.register("pathfollower", pathfollower)
demos.register("constraints",constraint)