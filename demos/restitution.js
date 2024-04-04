import {
  Transform,
  Movable,
  BoundingBox,
  Body2D,
  Rectangle,
  Sprite,
  BoxGeometry,
  BasicMaterial
} from "/src/index.js"
import { makePlatform } from "./utils.js"
import { viewport } from "./demo.js"
export function restitution(manager) {

  stackHorizontal(100, 500, 50, 50, 5, 100, manager)
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}

function stackHorizontal(x, y, w, h, no, spacing, manager) {
  for (let i = 1; i <= no; i++) {
    const body = new Body2D(new Rectangle(w, h))
    body.restitution = i / no
    manager.create([
    new Transform(x + (w + spacing) * i, y),
    new Movable(),
    new BoundingBox(),
    body,
    new Sprite(
        new BoxGeometry(w, h),
        new BasicMaterial()
      )
    ])
  }
}