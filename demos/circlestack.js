import {
  Transform,
  Movable,
  BoundingBox,
  Body2D,
  Circle,
  Sprite,
  CircleGeometry,
  BasicMaterial,
} from "/src/index.js"
import { makePlatform } from "./utils.js"
import { viewport } from "./demo.js"

export function circlestacking(manager) {
  stack(200, 300, 25, 8, 5, manager)
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}

function stack(x, y, r, no, spacing, manager) {
  for (let i = 0; i < no; i++) {
    manager.create([
    new Transform(x, y + (r + spacing) * i),
    new Movable(),
    new BoundingBox(),
    new Body2D(new Circle(r)),
    new Sprite(
        new CircleGeometry(r),
        new BasicMaterial()
      )
    ])
  }
}