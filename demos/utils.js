import {
  Transform,
  Movable,
  BoundingBox,
  Shape2D,
  createRawRigidBody2D,
  createTransform2D
} from "/src/index.js"

export function makePlatform(
  manager,
  x,
  y,
  width,
  height
) {
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
  const box = [
    ...createTransform2D(x, y),
    new Transform(x, y),
    new Movable(),
    new BoundingBox(),
    ...createRawRigidBody2D(Shape2D.rectangle(w, h), 0, 1, 1)
  ]
  return box
}