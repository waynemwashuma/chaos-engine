import { Entity, Ball, BodyMesh, AABBox, Movable } from "/src/index.js"
import { Transform } from "/src/index.js"

class BallEntity extends Entity {
  constructor(x = 0, y = 0, r) {
    super()
    let transform = new Transform(x, y)
    this.attach("transform", transform)
      .attach("movable", new Movable())
      .attach("bounds", new AABBox())
      .attach("mesh", new BodyMesh())
      .attach("body", new Ball(r))
  }
}

export {
  BallEntity
}