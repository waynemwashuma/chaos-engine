import {
  Transform,
  Movable,
  Body2D,
  BoundingBox,
  Box,
  Sprite,
  BoxGeometry,
  BasicMaterial
} from "/src/index.js"

export function makePlatform(
  manager,
  x,
  y,
  width,
  height
) {
  let box = new Box(width, height)
  box.type = Body2D.STATIC
  manager.create(createStaticBox(x, y, width, height))
}
export function makeContainer(
  manager,
  width,
  height,
  thickness,
  offsetx = 0,
  offsety = 0
) {
  //bottom
  manager.create(
    createStaticBox(
      offsetx + width / 2,
      offsety + height + thickness / 2,
      width + thickness * 2,
      thickness
    )
  )

  //right
  manager.create(
    createStaticBox(
      offsetx - thickness / 2,
      offsety + height / 2 + thickness,
      thickness,
      height + thickness
    )
  )
  //left
  manager.create(
    createStaticBox(
      offsetx + width + thickness / 2,
      offsety + height / 2 + thickness,
      thickness,
      height + thickness
    )
  )
}
function createStaticBox(x, y, w, h) {
  const box = {
    "transform": new Transform(x, y),
    "movable": new Movable(),
    "bounds": new BoundingBox(),
    "body": new Box(w, h),
    "sprite": new Sprite(
      new BoxGeometry(w, h),
      new BasicMaterial()
    )
  }
  box["body"].type = Body2D.STATIC
  box["body"].restitution = 1
  box["body"].staticFriction = 1
  box["body"].kineticFriction = 1
  return box
}