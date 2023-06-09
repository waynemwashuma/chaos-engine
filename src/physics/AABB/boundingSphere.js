import { Overlaps } from "./AABB.js"

/**
 * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
class BoundingCircle {

  /**
   * @param {number} [r=0]
   */
  constructor(r = 0) {
    this.r = r
    this.pos = { x: 0, y: 0 }
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param { BoundingBox} bound the bound to check  intersection with
   * 
   * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
   **/
  intersects(bound) {
    if (bounding.r)
      Overlaps.boundSpheresColliding(this, bound)
    Overlaps.AABBvsSphere(bound, this)
  }
  /**
   * Calculates the bounds of the body
   * 
   * @param {Body} body Body to calculate max and min from
   * @@param {Number} padding increases the size of the bounds
   */
  calculateBounds(body, padding = 0) {
    let radsq = 0,
      shape,
      vertex,
      tmp
    for (var i = 0; i < body.shapes.length; i++) {
      shape = body.shapes[i]
      if (shape.radius) {
        tmp = shape.radius * shape.radius
        if (tmp > radsq) radsq = tmp
        continue
      }
      for (var j = 0; j < body.shapes[i].vertices.length; j++) {
        vertex = body.shapes[i].vertices
        tmp = vertex.distanceToSquared(body.position)
        if (tmp > radsq) radsq = tmp
      }
    }
    this.pos.x = body.position.x
    this.pos.y = body.position.y
    this.r = Math.sqrt(radsq)
  }
  /**
   * Translates this bound to the given position.
   */
  update(pos) {
    let dx = pos.x - this.pos.x
    let dy = pos.y - this.pos.y

    this.pos.x = pos.x
    this.pos.y = pos.y
  }
}