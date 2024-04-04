import {
  Transform,
  Movable,
  BoundingBox,
  Body2D,
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
    new Body2D(new Rectangle(w, h)),
     new Sprite(
      new BoxGeometry(w, h),
      new BasicMaterial()
    )
  ]
  box[3].inv_mass = 0
  box[3].inv_inertia = 0
  box[3].restitution = 1
  box[3].staticFriction = 1
  box[3].kineticFriction = 1
  return box
}