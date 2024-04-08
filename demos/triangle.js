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

export function triangle(manager) {
  const rect = manager.getResource("renderer")
  const angle = Math.PI / 2
  const base = 200
  manager.create({
    "transform": new Transform(rect.width / 2, 300),
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
    rect.width / 2,
    rect.height * 0.8,
    rect.width,
    50
  )
  manager.getResource("gravity").y = 900
}