import { Entity, Box, BodyMesh,Body } from "/src/index.js"

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
    super.init(...arguments)
    let renderer = global.getSystem("renderer")
    let walls = createBoundingBox(30, 30, renderer.width - 60, renderer.height - 80, 1000)
    walls.forEach((w, i) => {
      let bound = Entity.Default(w.pos.x, w.pos.y)
      let body =  new Box(w.w,w.h)
      bound.attach("body",body)
        .attach("mesh", new BodyMesh())
      body.type = Body.STATIC
      this.manager.add(bound)
    })
    this.removeSelf()
  }
}
export {
  CanvasBounds
}