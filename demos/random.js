import {
  rand,
  Transform,
  Movable,
  BoundingBox,
  Box,
  Ball,
  Sprite,
  BoxGeometry,
  CircleGeometry,
  BasicMaterial
} from "/src/index.js"
import { makeContainer } from "./utils.js"

export function random(manager) {
  const rect = manager.getResource("renderer")
  const maxCount = 30
  let count = 0
  setInterval(()=>{
    if(count > maxCount) return
    randomEntities(1, manager)
    count++
  },100)
  makeContainer(
    manager,
    rect.width - 100,
    rect.height * 0.8,
    500,
    50,
    50
  )
  manager.getResource("gravity").y = 900
}

function randomEntities(n, manager) {
  const renderer = manager.getResource("renderer")
  const width = renderer.width - 100,
    height = renderer.height -100
  for (let i = 0; i < n; i++) {
    const props = rand()
    const x = width/2,
      y = height * 0.2,
      w = rand(50, 100),
      h = rand(50, 100)
    const [body, geometry] = (props <= 0.5) ? [new Box(w, h), new BoxGeometry(w, h)] : [new Ball(w / 2), new CircleGeometry(w / 2)]
    manager.create({
      "transform": new Transform(x, y),
      "movable": new Movable(rand(-100,100),200,rand(0,Math.PI)),
      "bound": new BoundingBox(),
      "body": body,
      "sprite": new Sprite(
        geometry,
        new BasicMaterial()
      )
    })
  }
}