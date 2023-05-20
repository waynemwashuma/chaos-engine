import { Entity, Box, AABBox, Transform, Movable, BodyMesh } from "/src/index.js"

class BoxEntity extends Entity {
  constructor(x,y, w, h) {
    super()
    let transform = new Transform(x,y)
    this.attach("transform", transform)
      .attach("movable", new Movable())
      .attach("bounds", new AABBox())
      .attach("mesh", new BodyMesh())
      .attach("body", new Box( w, h))
  }
}

export {
  BoxEntity
}