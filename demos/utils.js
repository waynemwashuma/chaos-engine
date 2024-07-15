import {
  BoundingBox,
  Shape2D,
  PhysicsProperties,
  createRigidBody2D,
  createMovable2D,
  createTransform2D
} from "chaos-studio"

export function makePlatform(
  x,
  y,
  width,
  height
) {
  return createStaticBox(x, y, width, height)
}
export function makeContainer(
  width,
  height,
  thickness,
  offsetx = 0,
  offsety = 0
) {
  return [
    //bottom
    createStaticBox(
      offsetx + width / 2,
      offsety + height + thickness / 2,
      width + thickness * 2,
      thickness
    ),
    //right
    createStaticBox(
      offsetx - thickness / 2,
      offsety + height / 2 + thickness,
      thickness,
      height + thickness
    ),
    //left
    createStaticBox(
      offsetx + width + thickness / 2,
      offsety + height / 2 + thickness,
      thickness,
      height + thickness
    )
  ]
}

function createStaticBox(x, y, w, h) {
  const collider = Shape2D.rectangle(w, h)
  const box = [
    ...createRigidBody2D(x, y, 0, 0,1,1),
    collider,
  ]
  return box
}
