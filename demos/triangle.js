import {
  Transform,
  Movable,
  BoundingBox,
  Sprite,
  TriangleGeometry,
  BasicMaterial,
  Triangle,
  createRawRigidBody2D
} from "/src/index.js"
import { makePlatform } from "./utils.js"
import {viewport} from "./demo.js"

export function triangle(manager) {
  const angle = Math.PI / 2
  const base = 200
  manager.create({
    "transform": new Transform(viewport.width / 2, 300),
    "movable": new Movable(),
    "bound": new BoundingBox(),
    ...createRawRigidBody2D(new Triangle(base, (base / 2) * Math.sin(angle), angle)),
    "sprite": new Sprite(
      new TriangleGeometry(base, (base / 2) * Math.sin(angle), angle),
      new BasicMaterial()
    )
  })
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50
  )
  manager.getResource("gravity").y = 900
}