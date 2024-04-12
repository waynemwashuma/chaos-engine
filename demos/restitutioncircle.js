import {
  Transform,
  Movable,
  BoundingBox,
  Body2D,
  Circle,
  Sprite,
  CircleGeometry,
  BasicMaterial
} from "/src/index.js"
import { makePlatform } from "./utils.js"
import { viewport } from "./demo.js"
export function circlerestitution(manager) {

  stackHorizontal(100, 500, 25, 5, 100, manager)
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}

function stackHorizontal(x, y, r, no, spacing, manager) {
  for (let i = 1; i <= no; i++) {
    const body = new Body2D(new Circle(r))
    body.restitution = i / no
    manager.create([
    new Transform(x + (r + spacing) * i, y),
    new Movable(),
    new BoundingBox(),
    body,
    new Sprite(
        new CircleGeometry(r),
        new BasicMaterial()
      )
    ])
  }
}