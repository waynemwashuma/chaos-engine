import {
  Transform,
  Movable,
  BoundingBox,
  Box,
  Sprite,
  BoxGeometry,
  BasicMaterial
} from "/src/index.js"
import { makePlatform } from "./utils.js"
import {viewport} from "./demo.js"

export function box(manager) {
  
  manager.create({
    "transform": new Transform(1000, 300), //,Math.PI/9),
    "movable": new Movable(0,0),
    "bound": new BoundingBox(),
    "body": new Box(50, 50),
    "sprite": new Sprite(
      new BoxGeometry(50, 50),
      new BasicMaterial()
    )
  })
  makePlatform(
    manager,
    viewport.width / 2,
    viewport.height * 0.8,
    viewport.width,
    50)
  manager.getResource("gravity").y = 900
}