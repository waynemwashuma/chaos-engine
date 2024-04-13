import {
  Transform,
  Movable,
  BoundingBox,
  createRawRigidBody2D,
  Rectangle,
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
    new Transform(x, y),
    new Movable(),
    new BoundingBox(),
    ...createRawRigidBody2D(new Rectangle(w, h),0,1,1),
     new Sprite(
      new BoxGeometry(w, h),
      new BasicMaterial()
    )
  ]
  return box
}